#!/usr/bin/env python3
"""
生成中国节假日日历 SVG（当月 + 下月）
数据源: NateScarlet/holiday-cn (GitHub)，失败时 fallback 到硬编码数据
用法: python3 generate-holiday-svg.py
输出: static/img/holiday-calendar.svg
"""

import base64
import datetime
import calendar
import io
import json
import os
import re
import ssl
import sys
import urllib.request
import urllib.error

# ========== 远程数据源 ==========
HOLIDAY_CN_URL = "https://raw.githubusercontent.com/NateScarlet/holiday-cn/master/{year}.json"
ORIGINAL_FONT_URL = "https://cdn.jsdelivr.net/gh/max32002/JasonHandWritingFonts@20240409/webfont/JasonHandwriting1-Regular.woff2"


# ========== 本地缓存目录（远程拉取成功后自动保存，作为下次 fallback）==========
CACHE_DIR = os.path.join(os.path.dirname(__file__), "cache")


def save_year_cache(year: int, data: dict):
    """把远程拉到的 {date_str: (name, is_off)} 保存为本地 JSON 缓存"""
    os.makedirs(CACHE_DIR, exist_ok=True)
    cache_path = os.path.join(CACHE_DIR, f"{year}.json")
    serializable = {d: list(v) for d, v in data.items()}
    with open(cache_path, "w") as f:
        json.dump(serializable, f, ensure_ascii=False, indent=2)
    print(f"  💾 缓存 {year} 年数据 → {cache_path}")


def load_year_cache(year: int):
    """从本地缓存加载某年份数据，返回 {date_str: (name, is_off)} 或 None"""
    cache_path = os.path.join(CACHE_DIR, f"{year}.json")
    if not os.path.isfile(cache_path):
        return None
    try:
        raw = json.load(open(cache_path))
        result = {d: tuple(v) for d, v in raw.items()}
        print(f"  📂 {year} 年数据: {len(result)} 条 (source: 本地缓存)")
        return result
    except Exception as e:
        print(f"  ⚠️  {year} 年缓存损坏: {e}")
        return None


def fetch_year_holidays(year: int):
    """从远程 API 拉取指定年份的节假日数据，返回 {date_str: (name, is_off_day)}"""
    url = HOLIDAY_CN_URL.format(year=year)
    for use_ssl_ctx in (True, False):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "holiday-svg-generator"})
            if use_ssl_ctx:
                ctx = ssl.create_default_context()
            else:
                ctx = ssl._create_unverified_context()
            with urllib.request.urlopen(req, timeout=10, context=ctx) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            result = {}
            for d in data.get("days", []):
                result[d["date"]] = (d["name"], d["isOffDay"])
            print(f"  ✅ {year} 年数据: {len(result)} 条 (source: holiday-cn)")
            save_year_cache(year, result)
            return result
        except Exception as e:
            last_error = e
    print(f"  ⚠️  {year} 年远程拉取失败: {last_error}")
    return None


def build_holiday_map(today: datetime.date):
    """合并当前年 + 下一年数据，返回 {date: (name, is_off_day)}"""
    current_year = today.year
    next_year = current_year + 1

    holiday_map = {}
    source_used = "holiday-cn"

    for year in (current_year, next_year):
        remote = fetch_year_holidays(year)
        if remote:
            for date_str, (name, is_off) in remote.items():
                d = datetime.date.fromisoformat(date_str)
                holiday_map[d] = (name, is_off)
        else:
            # 远程失败 → 尝试本地缓存
            cached = load_year_cache(year)
            if cached:
                source_used = source_used if source_used != "holiday-cn" else "hybrid"
                for date_str, (name, is_off) in cached.items():
                    d = datetime.date.fromisoformat(date_str)
                    holiday_map[d] = (name, is_off)
            else:
                print(f"  ⚠️  {year} 年无远程数据也无本地缓存，跳过")

    return holiday_map, source_used


def get_holiday_info(d: datetime.date, holiday_map: dict):
    """返回 (类型, 节日名) 类型: 'holiday' | 'makeup' | 'weekend' | 'workday'"""
    if d in holiday_map:
        name, is_off = holiday_map[d]
        if is_off:
            return "holiday", name
        else:
            return "makeup", name
    # 周末
    if d.weekday() >= 5:
        return "weekend", None
    return "workday", None


def collect_upcoming_holidays(today: datetime.date, holiday_map: dict, months_ahead: int = 2):
    """收集当前月 + N 个月内的所有假期
    返回 [(name, start, end, days_until_start, total_days), ...]"""
    # 计算月份范围
    months = []
    y, m = today.year, today.month
    for _ in range(months_ahead):
        months.append((y, m))
        m += 1
        if m > 12:
            m = 1
            y += 1

    # 聚合假期同名连续日期
    holiday_groups = {}
    for d, (name, is_off) in holiday_map.items():
        if not is_off:
            continue
        # 只取目标月份内的
        if (d.year, d.month) in months:
            holiday_groups.setdefault(name, []).append(d)

    result = []
    for name in sorted(holiday_groups.keys(), key=lambda n: min(holiday_groups[n])):
        dates = sorted(holiday_groups[name])
        start, end = dates[0], dates[-1]
        if end >= today:  # 假期未结束
            days = (start - today).days
            if days < 0:
                days = 0
            result.append((name, start, end, days, (end - start).days + 1))
    return result


def month_calendar(year: int, month: int):
    cal = calendar.Calendar(firstweekday=0)
    return cal.monthdatescalendar(year, month)


# ========== SVG 参数 ==========
CELL_W = 48
CELL_H = 44
DAY_LABEL_H = 22
MONTH_TITLE_H = 48
GAP = 24
PADDING = 20

COLORS = {
    "bg": "#ffffff",
    "text": "#24292f",
    "muted": "#57606a",
    "weekend": "#57606a",
    "holiday_bg": "#ffe5e5",
    "holiday_fg": "#cf222e",
    "makeup_bg": "#ddf4ff",
    "makeup_fg": "#0969da",
    "today_bg": "#1f883d",
    "today_fg": "#ffffff",
    "cross_month": "#d0d7de",
}


def render_month(target_year, target_month, x_offset, today, holiday_map):
    weeks = month_calendar(target_year, target_month)
    y = MONTH_TITLE_H + DAY_LABEL_H + PADDING

    chinese_months = ["一月", "二月", "三月", "四月", "五月", "六月",
                       "七月", "八月", "九月", "十月", "十一月", "十二月"]
    parts = [
        f'<text x="{x_offset + PADDING}" y="{MONTH_TITLE_H}" font-size="20" font-weight="600" fill="{COLORS["text"]}">{target_year}年 {chinese_months[target_month - 1]}</text>'
    ]

    week_labels = ["一", "二", "三", "四", "五", "六", "日"]
    for i, label in enumerate(week_labels):
        cx = x_offset + PADDING + i * CELL_W + CELL_W / 2
        cy = MONTH_TITLE_H + DAY_LABEL_H / 2 + 12
        color = COLORS["holiday_fg"] if i >= 5 else COLORS["muted"]
        parts.append(
            f'<text x="{cx}" y="{cy}" font-size="13" fill="{color}" text-anchor="middle" font-weight="500">{label}</text>'
        )

    holiday_group_start = {}

    for row_idx, week in enumerate(weeks):
        for col_idx, d in enumerate(week):
            cx = x_offset + PADDING + col_idx * CELL_W
            cy = y + row_idx * CELL_H
            cell_x = cx + 2
            cell_y = cy + 2
            cw = CELL_W - 4
            ch = CELL_H - 4
            radius = 6

            info_type, holiday_name = get_holiday_info(d, holiday_map)
            is_today = (d == today)
            in_this_month = (d.month == target_month)

            if not in_this_month:
                parts.append(
                    f'<text x="{cx + CELL_W / 2}" y="{cy + CELL_H / 2 + 5}" font-size="14" fill="{COLORS["cross_month"]}" text-anchor="middle">{d.day}</text>'
                )
                continue

            bg = None
            fg = COLORS["text"]

            if is_today:
                bg = COLORS["today_bg"]
                fg = COLORS["today_fg"]
            elif info_type == "holiday":
                bg = COLORS["holiday_bg"]
                fg = COLORS["holiday_fg"]
            elif info_type == "makeup":
                bg = COLORS["makeup_bg"]
                fg = COLORS["makeup_fg"]
            elif info_type == "weekend":
                fg = COLORS["weekend"]

            if bg:
                parts.append(
                    f'<rect x="{cell_x}" y="{cell_y}" width="{cw}" height="{ch}" rx="{radius}" ry="{radius}" fill="{bg}" />'
                )

            fw = "600" if is_today or info_type in ("holiday", "makeup") else "400"
            parts.append(
                f'<text x="{cx + CELL_W / 2}" y="{cy + CELL_H / 2 + 5}" font-size="15" font-weight="{fw}" fill="{fg}" text-anchor="middle">{d.day}</text>'
            )

            # 假期第一天格子内部顶部居中标节日名
            if info_type == "holiday" and holiday_name and holiday_name not in holiday_group_start:
                holiday_group_start[holiday_name] = True
                parts.append(
                    f'<text x="{cx + CELL_W / 2}" y="{cell_y + 11}" font-size="9" fill="{fg}" text-anchor="middle" font-weight="600">{holiday_name}</text>'
                )

            if info_type == "makeup":
                parts.append(
                    f'<text x="{cx + CELL_W / 2}" y="{cy + CELL_H - 6}" font-size="9" fill="{COLORS["makeup_fg"]}" text-anchor="middle" font-weight="500">班</text>'
                )

    return "\n".join(parts), len(weeks)


def collect_text_chars(parts):
    """从已经渲染好的 SVG 片段中收集所有 <text> 文本字符"""
    return "".join(re.findall(r"<text[^>]*>([^<]+)</text>", "\n".join(parts)))


def subset_font_for_text(text):
    """下载原始手写字体，子集化为本次用到的少量字符，返回 woff2 字节；失败返回 None"""
    try:
        from fontTools import subset
    except ImportError:
        print("  ⚠️  fontTools 未安装，无法内嵌字体（将回退到外部字体 URL）")
        return None
    try:
        req = urllib.request.Request(
            ORIGINAL_FONT_URL, headers={"User-Agent": "holiday-svg-generator"}
        )
        font_bytes = b""
        last_error = None
        for use_ssl_ctx in (True, False):
            try:
                ctx = ssl.create_default_context() if use_ssl_ctx else ssl._create_unverified_context()
                with urllib.request.urlopen(req, timeout=30, context=ctx) as resp:
                    font_bytes = resp.read()
                break
            except Exception as e:
                last_error = e
        if not font_bytes:
            raise last_error
        font = subset.load_font(io.BytesIO(font_bytes), subset.Options())
        opt = subset.Options()
        font_subset = subset.Subsetter(options=opt)
        font_subset.populate(text=text)
        font_subset.subset(font)
        font.flavor = "woff2"
        buf = io.BytesIO()
        font.save(buf)
        print(f"  ✅ 字体子集化完成: {len(set(text))} 字符 → {len(buf.getvalue()) / 1024:.1f} KB (woff2)")
        return buf.getvalue()
    except Exception as e:
        print(f"  ⚠️  字体子集化失败: {e}（将回退到外部字体 URL）")
        return None


def build_font_css(font_family):
    """构造内嵌字体的 @font-face CSS。
    README 里 SVG 通过 <img> 渲染，浏览器不会加载外部字体 URL，必须 base64 内嵌才能生效。
    子集化失败时回退到外部字体 URL。"""
    embedded = f'''
  @font-face {{
    font-family: "{font_family}";
    src: local("{font_family}"),
         url("https://cdn.jsdelivr.net/gh/max32002/JasonHandWritingFonts@20240409/webfont/JasonHandwriting1-Regular.woff2") format("woff2");
    font-display: swap;
  }}'''
    return embedded


def main():
    today = datetime.date.today()
    next_month = today.month % 12 + 1
    next_year = today.year + (1 if today.month == 12 else 0)

    print(f"📅 今日: {today} ({today.strftime('%A')})")
    print(f"🔄 拉取节假日数据...")

    holiday_map, source_used = build_holiday_map(today)
    print(f"📊 数据源: {source_used}, 共 {len(holiday_map)} 条")

    # 先收集假期，算行数
    upcoming = collect_upcoming_holidays(today, holiday_map)
    upcoming_lines = len(upcoming)

    # 渲染
    left_x = PADDING
    right_x = PADDING + 7 * CELL_W + GAP + PADDING * 2

    month_height = MONTH_TITLE_H + DAY_LABEL_H + 6 * CELL_H + PADDING * 2 + 24
    footer_area = 24 + upcoming_lines * 20 + 56  # 图例 + 假期行 + 数据来源底部留白
    svg_h = month_height + footer_area

    # ========== 渲染日历正文（先不写字体样式头，渲染完后收集用到的字符再内嵌字体）==========
    body_parts = []

    left_svg, rows_left = render_month(today.year, today.month, left_x, today, holiday_map)
    right_svg, rows_right = render_month(next_year, next_month, right_x, today, holiday_map)

    body_parts.append(left_svg)
    body_parts.append(right_svg)

    footer_y = month_height + 12
    legend_x = PADDING

    body_parts.append(f'<text x="{legend_x}" y="{footer_y}" font-size="11" fill="{COLORS["muted"]}">图例:</text>')

    legend_items = [
        ("放假", COLORS["holiday_bg"], COLORS["holiday_fg"]),
        ("调休上班", COLORS["makeup_bg"], COLORS["makeup_fg"]),
        ("今天", COLORS["today_bg"], COLORS["today_fg"]),
    ]
    lx = legend_x + 44
    for label, bg, fg in legend_items:
        body_parts.append(
            f'<rect x="{lx}" y="{footer_y - 12}" width="14" height="14" rx="3" fill="{bg}" />'
        )
        body_parts.append(
            f'<text x="{lx + 18}" y="{footer_y}" font-size="11" fill="{COLORS["text"]}">{label}</text>'
        )
        lx += 14 + len(label) * 13 + 18

    # 两个月内所有假期提示
    count_y = footer_y + 24
    for i, (name, start, end, days, total_days) in enumerate(upcoming):
        cy = count_y + i * 20
        if days == 0:
            text = f"🎉 今天是 {name} 假期第一天！共 {total_days} 天"
        else:
            text = f"📅 {name} ({start.month}/{start.day}–{end.month}/{end.day}) · 还有 {days} 天 · 共 {total_days} 天"
        body_parts.append(
            f'<text x="{legend_x}" y="{cy}" font-size="13" fill="{COLORS["holiday_fg"]}" font-weight="600">{text}</text>'
        )

    # 数据来源（动态 y 坐标）
    source_y = count_y + upcoming_lines * 20 + 24
    body_parts.append(
        f'<text x="796" y="{source_y}" font-size="10" fill="{COLORS["muted"]}" text-anchor="end">数据来源: 国务院办公厅 {today.year}</text>'
    )
    body_parts.append("</svg>")

    # ========== 构建内嵌字体 ==========
    # README 里 SVG 是用 <img> 渲染的，浏览器不会加载 SVG 内部 url(...) 引用的外部字体，
    # 所以必须把子集化字体 base64 内嵌成 data URI 才能让手写字体生效。
    font_family = "JasonHandwriting1-Regular"
    font_css = build_font_css(font_family)
    subset_data = subset_font_for_text(collect_text_chars(body_parts))
    if subset_data:
        b64 = base64.b64encode(subset_data).decode("ascii")
        font_css = (
            f'  @font-face {{ font-family: "{font_family}"; '
            f'src: local("{font_family}"), url(data:font/woff2;base64,{b64}) format("woff2"); '
            f"font-display: swap; }}"
        )

    svg_parts = [
        f'<?xml version="1.0" encoding="UTF-8"?>',
        f'<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 816 {svg_h}" role="img" aria-label="中国节假日日历">',
        "<style><![CDATA[",
        font_css,
        f'  text {{ font-family: "{font_family}", "PingFang SC", "Microsoft YaHei", sans-serif; }}',
        "]]></style>",
        f'<rect width="100%" height="100%" fill="{COLORS["bg"]}" />',
    ] + body_parts

    svg_content = "\n".join(svg_parts)

    out_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "holiday-calendar.svg")

    with open(out_path, "w", encoding="utf-8") as f:
        f.write(svg_content)

    print(f"✅ 已生成: {out_path}")
    for name, start, end, days, total in upcoming:
        print(f"   📅 {name} ({start.month}/{start.day}-{end.month}/{end.day}) 还有 {days} 天 · 共 {total} 天")

    # 供 GitHub Actions 判断是否有变化
    if "--check" in sys.argv:
        sys.exit(0)


if __name__ == "__main__":
    main()
