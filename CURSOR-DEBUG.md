# 光标显示问题修复

## 问题诊断

如果光标不显示，按以下步骤排查：

### 1. 检查 HTML 结构

打开浏览器开发者工具（F12），查看元素：

```html
<div id="output-wrap">
    <span id="output">这里是打字内容</span><span class="typing-cursor">■</span>
</div>
```

**要点：**
- 光标 `<span class="typing-cursor">` 必须存在
- 光标应该紧跟在 `#output` 后面（中间不要有换行）
- 光标的文本内容是 `■`

### 2. 检查 CSS 样式

在控制台执行：

```javascript
var cursor = document.querySelector('.typing-cursor');
console.log('光标元素:', cursor);
console.log('光标样式:', window.getComputedStyle(cursor));
console.log('display:', window.getComputedStyle(cursor).display);
console.log('opacity:', window.getComputedStyle(cursor).opacity);
console.log('color:', window.getComputedStyle(cursor).color);
```

**预期结果：**
- `display: inline`
- `opacity` 在 0 和 1 之间变化（闪烁动画）
- `color` 应该是绿色或主题色

### 3. 检查 typing.css 是否加载

```javascript
console.log('样式表数量:', document.styleSheets.length);
for (var i = 0; i < document.styleSheets.length; i++) {
    console.log('样式表', i, ':', document.styleSheets[i].href);
}
```

确认 `typing.css` 已加载。

### 4. 测试光标闪烁

在控制台执行：

```javascript
var cursor = document.querySelector('.typing-cursor');
if (cursor) {
    cursor.style.backgroundColor = 'red';
    cursor.style.padding = '5px';
}
```

如果看到红色背景，说明光标元素存在，只是样式问题。

### 5. 检查动画

```javascript
var cursor = document.querySelector('.typing-cursor');
console.log('动画名称:', window.getComputedStyle(cursor).animationName);
console.log('动画时长:', window.getComputedStyle(cursor).animationDuration);
```

应该显示 `blink` 动画。

## 常见问题

### 问题 1: 光标不闪烁

**原因：** CSS 动画没有应用

**解决：**
```css
.typing-cursor {
    animation: blink 0.7s infinite;
}
```

### 问题 2: 光标颜色看不见

**原因：** 颜色与背景相同

**解决：**
```javascript
// 在 config.js 中调整
theme: {
    primaryColor: '#00ff00',  // 确保与背景色对比
}
```

### 问题 3: 光标被隐藏

**原因：** `display: none` 或 `opacity: 0`

**解决：**
```css
.typing-cursor {
    display: inline !important;
    opacity: 1;
}
```

### 问题 4: 光标在错误位置

**原因：** HTML 结构问题

**解决：** 确保光标紧跟 `#output` 后面，不要换行

## 快速修复

如果光标完全不显示，在控制台执行：

```javascript
// 强制显示光标
var output = document.getElementById('output');
var cursor = document.querySelector('.typing-cursor');

if (!cursor) {
    // 创建光标
    cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '■';
    cursor.style.color = '#00ff00';
    cursor.style.fontWeight = 'bold';
    cursor.style.animation = 'blink 0.7s infinite';
    output.parentNode.appendChild(cursor);
    console.log('光标已重新创建');
} else {
    cursor.style.display = 'inline';
    cursor.style.opacity = '1';
    console.log('光标已显示');
}
```

## 最终检查清单

- [ ] HTML 中存在 `<span class="typing-cursor">■</span>`
- [ ] `typing.css` 文件已加载
- [ ] CSS 中 `.typing-cursor` 样式正确
- [ ] 动画 `@keyframes blink` 已定义
- [ ] 光标颜色与背景对比明显
- [ ] `display: inline` 而不是 `none`
- [ ] 浏览器控制台无报错

## 调试模式

临时添加以下代码到 `index.html` 底部：

```html
<script>
    // 光标调试
    setInterval(function() {
        var cursor = document.querySelector('.typing-cursor');
        if (cursor) {
            console.log('光标状态:', {
                存在: true,
                内容: cursor.textContent,
                display: window.getComputedStyle(cursor).display,
                opacity: window.getComputedStyle(cursor).opacity,
                color: window.getComputedStyle(cursor).color,
                位置: cursor.getBoundingClientRect()
            });
        } else {
            console.log('光标不存在！');
        }
    }, 2000);
</script>
```

这会每 2 秒输出一次光标状态。

---

**修复日期：** 2026-08-02  
**状态：** 已修复 HTML 结构和 CSS 样式
