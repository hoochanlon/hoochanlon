/**
 * 终端页面中央配置
 * 
 * 职责：统一管理所有可视化、交互和内容参数
 * 优先级：配置 > 默认值
 */

const TerminalConfig = {
  
  // ==================== 网站元信息 ====================
  meta: {
    title: 'GitHub Profile — Chanlon Hoo',
    description: '模拟终端的 GitHub Profile 网页面板',
    keywords: '简介,终端,个人主页',
  },

  // ==================== 内容源配置 ====================
  content: {
    // 内容文件路径（支持相对路径或绝对路径）
    source: 'content.md',
    
    // 内容分隔符（用于区分登录区和主内容区）
    separator: '---',
    
    // 登录区标题标记
    loginHeader: '# 登录信息',
    
    // 主内容标题标记
    mainHeader: '# 主要内容',
  },

  // ==================== 打字机效果 ====================
  typing: {
    // 是否启用打字机效果
    enabled: true,
    
    // 登录阶段打字速度（毫秒/字符，越小越快）
    loginSpeed: 80,
    
    // 主内容打字速度（毫秒/字符）
    mainSpeed: 80,
    
    // 登录阶段完成后的停顿时间（毫秒）
    loginPauseDuration: 1000,
    
    // 光标样式
    cursor: {
      char: '■',        // 光标字符
      blinkSpeed: 500,  // 闪烁速度（毫秒）
    },
    
    // 自动循环播放
    autoLoop: {
      enabled: true,           // 是否启用自动循环（与 autoRedirect 互斥，二选一）
      delayAfterComplete: 5000, // 内容播放完成后等待多久重新开始（毫秒）
    },
    
    // 自动跳转
    autoRedirect: {
      enabled: false,                           // 是否启用自动跳转（与 autoLoop 互斥，二选一）
      url: 'https://github.com/hoochanlon',    // 跳转目标 URL
      delay: 10000,                             // 内容播放完成后等待多久跳转（毫秒）
      openInNewTab: false,                      // 是否在新标签页打开（true=新标签，false=当前页跳转）
      showCountdown: true,                      // 是否显示倒计时提示
      countdownText: '将在 {seconds} 秒后跳转...', // 倒计时文本（{seconds} 会被替换为秒数）
    },
  },

  // ==================== Matrix 字幕雨 ====================
  matrix: {
    // 是否启用 Matrix 效果
    enabled: true,
    
    // 字符集（可自定义）
    charset: '01',
    
    // 字体大小
    fontSize: 15,
    
    // 字体样式
    fontFamily: '微软雅黑',
    fontWeight: 600,
    
    // 颜色配置
    color: '#00ff00',
    
    // 背景淡化透明度（越大淡化越快，范围 0-1）
    fadeOpacity: 0.05,
    
    // 刷新间隔（毫秒，越小越快）
    refreshInterval: 30,
    
    // 重置概率（数字越大越不容易重置，范围 0-1）
    resetProbability: 0.99,
  },

  // ==================== 自动滚动 ====================
  autoScroll: {
    // 是否启用自动滚动
    enabled: true,
    
    // 滚动行为（'smooth' | 'auto'）
    behavior: 'smooth',
    
    // 触发滚动的内容增长阈值（像素）
    threshold: 100,
  },

  // ==================== CRT 显示器效果 ====================
  crt: {
    // 是否启用 CRT 效果
    enabled: true,
    
    // 扫描线效果
    scanlines: true,
    
    // 屏幕闪烁效果
    flicker: true,
    
    // 屏幕曲率效果
    curvature: true,
    
    // 辉光效果强度（0-1）
    glowIntensity: 0.3,
  },

  // ==================== 主题与样式 ====================
  theme: {
    // 主题色
    primaryColor: '#00ff00',
    
    // 背景色
    backgroundColor: '#0a0a0a',
    
    // 文字颜色
    textColor: '#00ff00',
    
    // 链接颜色
    linkColor: '#00ff88',
    
    // 字体配置
    font: {
      family: 'Courier New, monospace',
      size: '16px',
      lineHeight: '1.6',
    },
    
    // 滚动条配置
    scrollbar: {
      visible: false,         // 是否显示滚动条
      width: '10px',         // 滚动条宽度
      trackColor: 'rgba(0, 0, 0, 0.5)',           // 轨道颜色
      thumbColor: 'rgba(0, 255, 2, 0.4)',         // 滑块颜色
      thumbHoverColor: 'rgba(0, 255, 2, 0.6)',    // 滑块悬停颜色
    },
  },

  // ==================== 交互行为 ====================
  interaction: {
    // 是否允许用户暂停动画（按空格键）
    allowPause: false,
    
    // 是否允许用户跳过动画（按 ESC 键）
    allowSkip: false,
    
    // 是否在动画完成后显示返回顶部按钮
    showBackToTop: false,
    
    // 返回顶部按钮出现的滚动距离（像素）
    backToTopThreshold: 500,
  },

  // ==================== 背景音乐 ====================
  audio: {
    // 是否启用背景音乐
    enabled: true,
    
    // 音乐文件路径
    source: './assets/music/Mona-Lisa-Overdrive.mp3',
    
    // 音量（0.0 - 1.0）
    volume: 0.5,
    
    // 是否循环播放
    loop: true,
    
    // 是否自动播放（某些浏览器可能会阻止自动播放）
    autoplay: true,
    
    // 淡入时间（毫秒）
    fadeInDuration: 2000,
    
    // 是否显示音乐控制按钮
    showControls: false,
    
    // ==================== 启动提示配置 ====================
    // 在页面加载后显示一个选择框，让用户决定是否播放音乐
    // 提供仪式感和交互性，3秒倒计时后自动选择
    prompt: {
      enabled: true,                         // 是否显示启动提示（false 则直接播放音乐）
      message: '惊险高速，是否进行重装上阵？',  // 提示消息（支持换行 \n）
      yesText: '是',                         // 确认按钮文本（自定义为"启动"、"CONFIRM"等）
      noText: '否',                          // 取消按钮文本（自定义为"静默"、"ABORT"等）
      autoSelectDelay: 5000,                 // 自动选择延迟（毫秒，3000=3秒，5000=5秒）
      defaultChoice: 'yes',                  // 默认选择 ('yes' 播放音乐 | 'no' 保持静音)
    },
  },

  // ==================== 调试与性能 ====================
  debug: {
    // 是否启用调试模式（显示性能信息）
    enabled: false,
    
    // 是否在控制台输出日志
    consoleLog: false,
    
    // 性能监控
    performance: false,
  },

  // ==================== 辅助功能 ====================
  accessibility: {
    // 是否启用无障碍模式（跳过动画）
    reduceMotion: false,
    
    // 高对比度模式
    highContrast: false,
    
    // 字体缩放比例
    fontScale: 1.0,
  },

};

// 导出配置（支持 ES6 模块和传统脚本）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TerminalConfig;
}

// 浏览器环境下暴露到全局
if (typeof window !== 'undefined') {
  window.TerminalConfig = TerminalConfig;
}
