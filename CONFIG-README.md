# Config.js 配置文档

这个配置系统为终端页面提供了全面的可定制性，所有视觉效果、交互行为和内容源都可以在 `config.js` 中统一管理。

---

## 📋 配置结构

### 1. 网站元信息 (`meta`)

控制页面的基础信息，影响 SEO 和浏览器标签显示。

```javascript
meta: {
  title: 'Github Profile — Chanlon Hoo',      // 浏览器标签页标题
  description: '模拟终端的资料简介面板',          // 页面描述（SEO）
  keywords: '简介,终端,个人主页',             // 关键词（SEO）
}
```

---

### 2. 内容源配置 (`content`)

定义内容的来源和解析规则。

```javascript
content: {
  source: 'content.md',                     // 内容文件路径
                                             // 支持相对路径：'content.md'
                                             // 支持绝对路径：'/Users/xxx/content.md'
                                             // 支持 URL：'https://example.com/content.md'
  
  separator: '---',                          // 内容分隔符
  loginHeader: '# 登录信息',                 // 登录区标题
  mainHeader: '# 主要内容',                  // 主内容区标题
}
```

**使用场景：**
- 本地文件：`source: 'content.md'` 或 `source: './data/intro.md'`
- 绝对路径：`source: '/Users/chanlonhoo/Documents/GitHub/hoochanlon/content.md'`
- 远程文件：`source: 'https://raw.githubusercontent.com/user/repo/main/content.md'`

---

### 3. 打字机效果 (`typing`)

控制文字逐字显示的动画效果。

```javascript
typing: {
  enabled: true,                             // 是否启用（false 则直接显示全部内容）
  
  loginSpeed: 50,                            // 登录阶段速度（毫秒/字符）
  mainSpeed: 30,                             // 主内容速度（毫秒/字符）
                                             // 数值越小速度越快
  
  loginPauseDuration: 1000,                  // 登录完成后的停顿时间（毫秒）
  
  cursor: {
    char: '■',                               // 光标字符（可改为 '_' '|' '█' 等）
    blinkSpeed: 500,                         // 闪烁速度（毫秒）
  },
}
```

**调优建议：**
- 快速浏览：`loginSpeed: 20, mainSpeed: 10`
- 舒适阅读：`loginSpeed: 50, mainSpeed: 30`（默认）
- 慢速展示：`loginSpeed: 100, mainSpeed: 80`

---

### 4. Matrix 字幕雨 (`matrix`)

背景的 Matrix 风格数字雨效果。

```javascript
matrix: {
  enabled: false,                            // 是否启用（默认关闭）
  
  charset: '01',                             // 字符集
                                             // 推荐：'01' '0123456789' 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                                             // 自定义：'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ'（日文片假名）
  
  fontSize: 15,                              // 字体大小
  fontFamily: '微软雅黑',                     // 字体
  fontWeight: 600,                           // 字重
  
  color: '#00ff00',                          // 字符颜色（默认绿色）
  fadeOpacity: 0.05,                         // 淡化速度（0.01-0.2）
  refreshInterval: 30,                       // 刷新间隔（毫秒）
  resetProbability: 0.99,                    // 重置概率（0-1，越大越慢）
}
```

**预设效果：**
- 经典 Matrix：`enabled: true, charset: '01', color: '#00ff00'`
- 红色警报：`enabled: true, charset: '!@#$%', color: '#ff0000', fadeOpacity: 0.1`
- 数字海洋：`enabled: true, charset: '0123456789', fontSize: 12`

---

### 5. 自动滚动 (`autoScroll`)

内容增长时自动滚动到底部。

```javascript
autoScroll: {
  enabled: true,                             // 是否启用
  behavior: 'smooth',                        // 'smooth' 平滑滚动 | 'auto' 瞬间跳转
  threshold: 100,                            // 触发阈值（像素增长量）
}
```

---

### 6. CRT 显示器效果 (`crt`)

模拟老式阴极射线管显示器的视觉效果。

```javascript
crt: {
  enabled: true,                             // 总开关
  scanlines: true,                           // 扫描线效果
  flicker: true,                             // 屏幕闪烁
  curvature: true,                           // 屏幕曲率
  glowIntensity: 0.3,                        // 辉光强度（0-1）
}
```

**注意：** 这些效果由 `css/crt-terminal.css` 控制，配置项为预留扩展。

---

### 7. 主题与样式 (`theme`)

全局色彩和字体配置。

```javascript
theme: {
  primaryColor: '#00ff00',                   // 主题色
  backgroundColor: '#0a0a0a',                // 背景色
  textColor: '#00ff00',                      // 文字颜色
  linkColor: '#00ff88',                      // 链接颜色
  
  font: {
    family: 'Courier New, monospace',        // 字体族
    size: '16px',                            // 字体大小
    lineHeight: '1.6',                       // 行高
  },
}
```

**经典配色方案：**
- 绿色终端：`textColor: '#00ff00', backgroundColor: '#0a0a0a'`
- 琥珀终端：`textColor: '#ffb000', backgroundColor: '#1a0a00'`
- 白底黑字：`textColor: '#000000', backgroundColor: '#ffffff'`
- 深蓝夜间：`textColor: '#66d9ef', backgroundColor: '#1e1e2e'`

---

### 8. 交互行为 (`interaction`)

用户交互控制。

```javascript
interaction: {
  allowPause: true,                          // 允许暂停（按空格键）
  allowSkip: true,                           // 允许跳过（按 ESC 键）
  showBackToTop: true,                       // 显示返回顶部按钮
  backToTopThreshold: 500,                   // 按钮出现的滚动距离（像素）
}
```

---

### 9. 调试与性能 (`debug`)

开发辅助工具。

```javascript
debug: {
  enabled: false,                            // 启用调试模式
  consoleLog: false,                         // 控制台日志
  performance: false,                        // 性能监控
}
```

**使用场景：**
- 开发时：`enabled: true, consoleLog: true`
- 生产环境：全部 `false`

---

### 10. 辅助功能 (`accessibility`)

无障碍访问支持。

```javascript
accessibility: {
  reduceMotion: false,                       // 减少动画（直接显示内容）
  highContrast: false,                       // 高对比度模式
  fontScale: 1.0,                            // 字体缩放（1.0 = 100%）
}
```

---

## 🎯 常见使用场景

### 场景 1：纯静态展示（无动画）

```javascript
typing: { enabled: false },
matrix: { enabled: false },
autoScroll: { enabled: false },
```

### 场景 2：快速演示模式

```javascript
typing: {
  enabled: true,
  loginSpeed: 20,
  mainSpeed: 10,
  loginPauseDuration: 500,
},
```

### 场景 3：Matrix 炫酷模式

```javascript
matrix: {
  enabled: true,
  charset: 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ',
  color: '#00ff00',
  fadeOpacity: 0.08,
  refreshInterval: 25,
},
```

### 场景 4：自定义远程内容

```javascript
content: {
  source: 'https://raw.githubusercontent.com/yourname/repo/main/intro.md',
  separator: '---',
  loginHeader: '# Welcome',
  mainHeader: '# About Me',
},
```

---

## 🔧 快速修改指南

| 想要实现 | 修改配置 |
|---------|---------|
| 关闭打字机效果 | `typing.enabled: false` |
| 开启 Matrix 背景 | `matrix.enabled: true` |
| 加快打字速度 | 减小 `typing.loginSpeed` 和 `mainSpeed` |
| 更换内容文件 | 修改 `content.source` |
| 改变主题色 | 修改 `theme.textColor` 和 `theme.backgroundColor` |
| 禁用自动滚动 | `autoScroll.enabled: false` |
| 隐藏返回顶部 | `interaction.showBackToTop: false` |

---

## 💡 高级技巧

### 1. 动态加载配置

如果需要从服务器加载配置：

```javascript
fetch('/api/config')
  .then(res => res.json())
  .then(serverConfig => {
    Object.assign(TerminalConfig, serverConfig);
  });
```

### 2. 多语言支持

```javascript
const lang = navigator.language.startsWith('zh') ? 'zh' : 'en';
content: {
  source: `content-${lang}.md`,
}
```

### 3. 响应式字体

```javascript
theme: {
  font: {
    size: window.innerWidth > 768 ? '16px' : '14px',
  },
}
```

---

## 🚀 性能优化建议

1. **生产环境关闭调试：** `debug.enabled: false`
2. **Matrix 效果性能影响：** 移动设备建议 `matrix.enabled: false`
3. **打字速度平衡：** 太快影响阅读，太慢影响体验，默认值已优化
4. **自动滚动阈值：** `threshold` 过小会频繁触发，建议 100-200

---

## 📝 注意事项

1. 修改 `config.js` 后需要刷新页面生效
2. 绝对路径跨域加载可能受 CORS 限制
3. Matrix 效果在低配设备可能卡顿
4. 打字机效果禁用后会直接显示全部内容
5. 配置项可以部分省略，未定义项使用默认值

---

## 🆘 故障排查

**问题：内容不显示**
- 检查 `content.source` 路径是否正确
- 打开浏览器控制台查看错误信息
- 确认 `content.separator` 与文件格式匹配

**问题：打字效果不生效**
- 确认 `typing.enabled: true`
- 检查 `typing/typing.js` 是否加载成功

**问题：Matrix 不显示**
- 确认 `matrix.enabled: true`
- 检查 `matrix.js` 是否加载成功
- 确认 HTML 中有 `<canvas id="matrix">` 元素

**问题：样式不生效**
- 清除浏览器缓存
- 检查 CSS 文件是否正确加载
- 确认配置中的颜色值格式正确（如 `#00ff00`）

---

**配置版本：** v1.0  
**最后更新：** 2026-08-02



## 杂项

在hoochanlon.html的 `source` 元素输入需要打印的内容，再次运行，`output-wrap`元素即会进行动态打印输出信息到网页上。

```html
        在source内填入需要进行打印的信息
        <div id="source">
          Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Exercitationem
           modi nostrum architecto 
        </div><br>
     
        output-wrap在网页输出的信息
        <div id="output-wrap">
            <span id="output"></span>
            <span class="typing-cursor">■</span>
          </div>
```

![test.gif](https://i.loli.net/2020/06/15/1WSwQ3MkUixV4jP.gif)


|引入项目|参考资料|
|:-:|:-:|
|[typing.js](https://github.com/coffeedeveloper/typing.js) |[MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)|
|[Font Awesome](https://www.thinkcmf.com/font/search/index.html) & [icons8](https://icons8.com)|[w3cschool-javascript](https://www.w3school.com.cn/js/index.asp)|
| [waka-readme](https://github.com/athul/waka-readme)|[www.jq22.com](https://www.jq22.com/webqd1311)|
