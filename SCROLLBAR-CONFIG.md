# 滚动条配置指南

## 📜 新增功能：滚动条自定义

现在你可以通过 `config.js` 完全控制滚动条的显示和样式。

---

## 配置项说明

在 `config.js` 的 `theme` 部分添加了 `scrollbar` 配置：

```javascript
theme: {
  // ... 其他主题配置
  
  scrollbar: {
    visible: true,                           // 是否显示滚动条
    width: '10px',                           // 滚动条宽度
    trackColor: 'rgba(0, 0, 0, 0.5)',       // 轨道颜色
    thumbColor: 'rgba(0, 255, 2, 0.4)',     // 滑块颜色
    thumbHoverColor: 'rgba(0, 255, 2, 0.6)', // 滑块悬停颜色
  },
}
```

---

## 使用场景

### 1. 隐藏滚动条（推荐用于截图/演示）

```javascript
theme: {
  scrollbar: {
    visible: false,
  },
}
```

隐藏后仍然可以滚动，只是看不到滚动条。

### 2. 自定义滚动条颜色（匹配主题色）

**红色主题：**
```javascript
theme: {
  textColor: '#ff0000',
  scrollbar: {
    visible: true,
    thumbColor: 'rgba(255, 0, 0, 0.4)',
    thumbHoverColor: 'rgba(255, 0, 0, 0.6)',
  },
}
```

**琥珀色主题：**
```javascript
theme: {
  textColor: '#ffb000',
  scrollbar: {
    visible: true,
    thumbColor: 'rgba(255, 176, 0, 0.4)',
    thumbHoverColor: 'rgba(255, 176, 0, 0.6)',
  },
}
```

**蓝色主题：**
```javascript
theme: {
  textColor: '#66d9ef',
  scrollbar: {
    visible: true,
    thumbColor: 'rgba(102, 217, 239, 0.4)',
    thumbHoverColor: 'rgba(102, 217, 239, 0.6)',
  },
}
```

### 3. 调整滚动条宽度

**更细的滚动条：**
```javascript
theme: {
  scrollbar: {
    visible: true,
    width: '6px',
  },
}
```

**更粗的滚动条：**
```javascript
theme: {
  scrollbar: {
    visible: true,
    width: '14px',
  },
}
```

### 4. 极简模式

```javascript
theme: {
  scrollbar: {
    visible: false,
  },
},
matrix: { enabled: false },
typing: { enabled: false },
crt: { enabled: false },
```

---

## 技术细节

### 实现原理

- **visible: false** 时，使用 CSS 隐藏滚动条：
  ```css
  #crt-content::-webkit-scrollbar {
      display: none;
  }
  ```
  
- **visible: true** 时，动态注入自定义滚动条样式

### 浏览器兼容性

- ✅ Chrome/Edge（Chromium）：完全支持
- ✅ Safari：完全支持
- ✅ Firefox：支持隐藏，但自定义样式有限
- ⚠️ IE：不支持自定义样式

---

## 常见问题

### Q：隐藏滚动条后还能滚动吗？
**A：** 可以！滚动条只是视觉上隐藏，你仍然可以用鼠标滚轮、触控板或键盘滚动。

### Q：滚动条颜色不生效？
**A：** 
1. 检查颜色格式是否正确（需要用引号包裹）
2. 清除浏览器缓存后刷新
3. Firefox 对滚动条自定义支持有限

### Q：如何完全移除滚动功能？
**A：** 修改 CSS 中的 `overflow` 属性（不推荐，会导致内容超出时无法查看）

---

## 快速测试

修改 `config.js` 后，刷新页面即可看到效果：

1. **测试隐藏：** `scrollbar.visible: false`
2. **测试颜色：** 修改 `thumbColor` 为 `'rgba(255, 0, 0, 0.5)'`（红色）
3. **测试宽度：** 修改 `width` 为 `'20px'`

---

**添加时间：** 2026-08-02
**版本：** v2.1
