# Chanlon Hoo 的个人主页

基于 [Hugo](https://gohugo.io) 和 [Lynx](https://github.com/jpanther/lynx) 主题构建的个人链接页面。

🌐 **在线访问**: https://hoochanlon.github.io/

## 项目结构

```
hoochanlon/
├── config.toml              # Hugo 站点配置
├── content/                 # 内容文件
│   └── _index.md           # 首页内容
├── layouts/                 # 自定义布局模板
│   └── partials/
│       ├── head.html       # 修复的头部模板
│       └── footer.html     # 修复的底部模板
├── static/                  # 静态资源
│   └── hcl/                # CRT 终端项目（已适配移动端）
│       ├── index.html
│       ├── css/
│       ├── js/
│       └── ...
├── themes/                  # Hugo 主题
│   └── lynx-dev/           # Lynx 主题
├── assets/                  # 原始资源文件
├── .github/workflows/       # GitHub Actions 自动部署
│   └── hugo.yml
└── public/                  # 构建输出（被 .gitignore 忽略）
```

## 特性

✨ **响应式设计** - 完美适配桌面端和移动端  
🎨 **CRT 终端效果** - 复古终端风格的子页面  
🌙 **深色模式** - 基于浏览器自动切换  
🚀 **自动部署** - 推送到 main 分支自动部署到 GitHub Pages  
🔗 **社交链接** - 集成多平台链接展示

## 本地开发

### 前置要求

- [Hugo](https://gohugo.io/installation/) v0.164.0 或更高版本（推荐 extended 版本）

### 启动开发服务器

```bash
hugo server -D
```

在浏览器中访问 http://localhost:1313

### 查看 CRT 终端页面

http://localhost:1313/hcl/index.html

## 自定义配置

### 修改个人信息

编辑 `config.toml` 文件：

```toml
[params.author]
  name = "你的名字"
  headline = "你的简介"
  # image = "author.jpg"  # 头像图片放在 static/ 目录

  links = [
    { link = { href = "/hcl/index.html", text = "🖥️ CRT Terminal", icon = "link", target = "_self" } },
    { github = "https://github.com/你的用户名" },
    { email = "mailto:your@email.com" },
    # 更多链接...
  ]
```

### 支持的链接类型

Lynx 主题支持众多平台图标，包括：
- GitHub, GitLab, Bitbucket
- Twitter, LinkedIn, Instagram, Facebook
- YouTube, Twitch, TikTok
- Email, Website
- 更多平台请查看 `themes/lynx-dev/assets/icons/`

### 添加头像

将头像图片放到 `static/` 目录，然后在 `config.toml` 中取消注释：

```toml
image = "author.jpg"
```

### 修改首页内容

编辑 `content/_index.md` 文件，支持 Markdown 格式。

## 部署到 GitHub Pages

### 自动部署（推荐）

1. 在 GitHub 仓库设置中启用 Pages
2. 选择 **Source**: GitHub Actions
3. 推送代码到 `main` 分支，GitHub Actions 会自动构建和部署

### 手动构建

```bash
# 构建静态文件
hugo --gc --minify

# 生成的文件在 public/ 目录
```

## CRT 终端项目

位于 `static/hcl/` 的 CRT 终端项目特性：
- ✅ 复古 CRT 显示器效果
- ✅ 打字机动画效果
- ✅ Matrix 字幕雨背景
- ✅ 完整移动端适配（全屏显示）
- ✅ 自定义配置支持

## 技术栈

- **Hugo** - 静态站点生成器
- **Lynx** - Hugo 主题
- **Tailwind CSS** - CSS 框架
- **GitHub Actions** - CI/CD 自动部署
- **GitHub Pages** - 静态站点托管

## 许可证

本项目基于原有项目文件，Lynx 主题遵循其原始许可证。

## 致谢

- [Hugo](https://gohugo.io) - 快速灵活的静态站点生成器
- [Lynx Theme](https://github.com/jpanther/lynx) - 简洁优雅的链接主题
