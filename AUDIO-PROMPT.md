# 音乐启动提示功能

## 🎮 功能概述

在页面加载后，显示一个赛博朋克风格的启动提示框，让用户选择是否播放背景音乐。这个功能增加了仪式感和交互性。

---

## 📋 配置说明

在 `config.js` 的 `audio.prompt` 部分配置：

```javascript
audio: {
  enabled: true,
  
  // ... 其他音频配置
  
  prompt: {
    enabled: true,                         // 是否显示启动提示
    message: '惊险高速，是否进行重装上阵？',  // 提示消息
    yesText: '是',                         // 确认按钮文本
    noText: '否',                          // 取消按钮文本
    autoSelectDelay: 3000,                 // 自动选择延迟（毫秒）
    defaultChoice: 'yes',                  // 默认选择 ('yes' | 'no')
  },
}
```

---

## 🎯 配置项详解

### enabled（启用提示）
- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 是否显示启动提示对话框

```javascript
// 启用提示（推荐）
prompt: { enabled: true }

// 禁用提示，直接播放音乐
prompt: { enabled: false }
```

### message（提示消息）
- **类型**: `string`
- **默认值**: `'惊险高速，是否进行重装上阵？'`
- **说明**: 对话框中显示的主要消息

```javascript
// 自定义消息
prompt: { 
  message: '检测到赛博音轨，是否连接？' 
}

prompt: { 
  message: 'SYSTEM READY\nActivate background music?' 
}
```

### yesText / noText（按钮文本）
- **类型**: `string`
- **默认值**: `'是'` / `'否'`
- **说明**: 两个选择按钮的文本

```javascript
// 中文按钮
prompt: {
  yesText: '是',
  noText: '否'
}

// 英文按钮
prompt: {
  yesText: 'YES',
  noText: 'NO'
}

// 创意文本
prompt: {
  yesText: '启动',
  noText: '静默'
}
```

### autoSelectDelay（自动选择延迟）
- **类型**: `number`
- **单位**: 毫秒
- **默认值**: `3000`
- **说明**: 倒计时结束后自动选择

```javascript
// 3秒后自动选择（默认）
prompt: { autoSelectDelay: 3000 }

// 5秒后自动选择
prompt: { autoSelectDelay: 5000 }

// 1秒后自动选择（快速）
prompt: { autoSelectDelay: 1000 }

// 10秒后自动选择（给用户更多时间）
prompt: { autoSelectDelay: 10000 }
```

### defaultChoice（默认选择）
- **类型**: `'yes'` | `'no'`
- **默认值**: `'yes'`
- **说明**: 倒计时结束后的默认选项

```javascript
// 默认播放音乐
prompt: { defaultChoice: 'yes' }

// 默认不播放音乐
prompt: { defaultChoice: 'no' }
```

---

## 🎨 视觉效果

### 提示框样式
- 黑色半透明背景
- 绿色边框和文字（赛博朋克风格）
- 绿色发光效果
- 居中显示

### 按钮交互
- 鼠标悬停：背景变亮，绿色发光
- 鼠标离开：恢复原样
- 点击：立即执行选择

### 倒计时
- 实时显示剩余秒数
- 提示默认选择
- 到0时自动执行

---

## 💡 使用场景

### 场景 1：标准配置（推荐）

```javascript
audio: {
  enabled: true,
  prompt: {
    enabled: true,
    message: '惊险高速，是否进行重装上阵？',
    yesText: '是',
    noText: '否',
    autoSelectDelay: 3000,
    defaultChoice: 'yes',
  },
}
```

### 场景 2：英文版本

```javascript
audio: {
  enabled: true,
  prompt: {
    enabled: true,
    message: 'SYSTEM READY. Activate audio protocol?',
    yesText: 'CONFIRM',
    noText: 'ABORT',
    autoSelectDelay: 3000,
    defaultChoice: 'yes',
  },
}
```

### 场景 3：更长倒计时（给新用户更多时间）

```javascript
audio: {
  enabled: true,
  prompt: {
    enabled: true,
    message: '是否开启背景音乐？\n（音量可通过右上角按钮调节）',
    yesText: '开启',
    noText: '保持静音',
    autoSelectDelay: 5000,
    defaultChoice: 'yes',
  },
}
```

### 场景 4：默认静音

```javascript
audio: {
  enabled: true,
  prompt: {
    enabled: true,
    message: '检测到背景音乐，是否播放？',
    yesText: '播放',
    noText: '静音',
    autoSelectDelay: 3000,
    defaultChoice: 'no',  // 默认不播放
  },
}
```

### 场景 5：快速启动

```javascript
audio: {
  enabled: true,
  prompt: {
    enabled: true,
    message: '启动音效？',
    yesText: '是',
    noText: '否',
    autoSelectDelay: 1000,  // 1秒快速倒计时
    defaultChoice: 'yes',
  },
}
```

### 场景 6：关闭提示（直接播放）

```javascript
audio: {
  enabled: true,
  prompt: {
    enabled: false,  // 不显示提示
  },
  autoplay: true,
}
```

---

## 🔄 交互流程

1. **页面加载完成**
   - 如果 `audio.enabled` 为 `true` 且 `prompt.enabled` 为 `true`
   - 显示启动提示对话框

2. **显示提示框**
   - 显示自定义消息
   - 显示两个选择按钮
   - 开始倒计时

3. **用户选择**
   - **点击"是"**: 立即播放音乐，对话框消失
   - **点击"否"**: 不播放音乐，对话框消失
   - **等待倒计时**: 自动执行默认选择

4. **音乐播放**
   - 如果选择播放，音乐会淡入开始
   - 右上角显示音乐控制按钮

---

## 🎭 创意文案示例

```javascript
// 赛博朋克风格
message: '系统检测：音频驱动就绪\n是否初始化声波协议？'

// 科幻风格
message: '[ AUDIO PROTOCOL DETECTED ]\nInitialize soundtrack?'

// 黑客风格
message: 'root@terminal:~# play_music.sh\nExecute? [Y/n]'

// 游戏风格
message: '⚡ 准备开启战斗模式\n是否激活背景音轨？'

// 幽默风格
message: '检测到优质赛博音乐\n不听可能会后悔哦 (๑•̀ㅂ•́)و✧'

// 简洁风格
message: 'Play music?'

// 故事化
message: '夜幕降临，霓虹初亮\n是否为你的赛博之旅配上音乐？'
```

---

## ⚙️ 技术细节

### 对话框层级
- `z-index: 10000` 确保在所有内容之上
- 半透明黑色背景遮罩
- 绿色边框发光效果

### 倒计时机制
- 每秒更新一次显示
- 到0时自动执行默认选择
- 用户点击会立即停止倒计时

### 音乐播放
- 选择"是"后才创建音频对象并播放
- 使用淡入效果避免突然开始
- 播放失败会在控制台输出错误

---

## 🐛 故障排查

### 问题 1：提示框不显示

**检查：**
```javascript
audio: {
  enabled: true,           // 必须为 true
  prompt: {
    enabled: true,         // 必须为 true
  }
}
```

### 问题 2：倒计时不准确

**原因：** JavaScript 定时器精度问题

**说明：** 这是正常的，误差在 ±100ms 内

### 问题 3：选择"是"后没有声音

**检查：**
1. 音频文件路径是否正确
2. 浏览器是否允许播放音频
3. 系统音量是否静音
4. 检查浏览器控制台的错误信息

---

## 💻 自定义样式

如果你想修改提示框样式，可以在初始化后添加 CSS：

```javascript
// 在 showAudioPrompt 函数中修改 promptBox.style.cssText
promptBox.style.cssText = `
    /* 自定义你的样式 */
    background: rgba(10, 10, 50, 0.95);  // 深蓝色背景
    border: 3px solid #00ffff;            // 青色边框
    color: #00ffff;                       // 青色文字
    /* ... */
`;
```

---

## 🎯 最佳实践

1. **倒计时时间**：3-5秒较为合适
2. **默认选择**：建议默认播放（`yes`）
3. **消息文本**：简洁明了，符合主题
4. **按钮文本**：清晰易懂
5. **考虑多语言**：提供中英文版本

---

**添加时间：** 2026-08-02  
**功能版本：** v2.3  
**状态：** ✅ 已实现并测试
