/**
 * Terminal Application Controller
 * 终端应用主控制器
 * 
 * 职责：统一管理所有功能模块的初始化和交互
 */

(function() {
    var config = window.TerminalConfig || {};
    
    // 调试日志
    console.log('TerminalConfig loaded:', config);
    console.log('Typing enabled:', config.typing?.enabled);
    console.log('Matrix enabled:', config.matrix?.enabled);
    
    var matrixEffect;
    var currentTyping = null;
    var isPaused = false;
    var lastScrollHeight = 0;
    var audioInstance = null;
    
    // ==================== 元信息 ====================
    function applyMetadata() {
        var meta = config.meta || {};
        document.title = meta.title || 'Terminal';
        var descMeta = document.querySelector('meta[name="description"]');
        var keywordsMeta = document.querySelector('meta[name="keywords"]');
        if (descMeta) descMeta.content = meta.description || '';
        if (keywordsMeta) keywordsMeta.content = meta.keywords || '';
    }
    
    // ==================== 主题样式 ====================
    function applyTheme() {
        var theme = config.theme || {};
        var scrollbar = theme.scrollbar || {};
        var style = document.getElementById('dynamic-theme');
        
        var css = `
            body {
                background-color: ${theme.backgroundColor || '#0a0a0a'};
                color: ${theme.textColor || '#00ff00'};
                font-family: ${theme.font?.family || 'Courier New, monospace'};
                font-size: ${theme.font?.size || '16px'};
                line-height: ${theme.font?.lineHeight || '1.6'};
            }
            #output a {
                color: ${theme.linkColor || '#00ff88'};
            }
            .typing-cursor {
                color: ${theme.primaryColor || '#00ff00'};
            }
        `;
        
        // 滚动条样式
        if (scrollbar.visible === false) {
            css += `
            #crt-content::-webkit-scrollbar {
                display: none;
            }
            #crt-content {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
            `;
        } else {
            css += `
            #crt-content::-webkit-scrollbar {
                width: ${scrollbar.width || '10px'};
            }
            #crt-content::-webkit-scrollbar-track {
                background: ${scrollbar.trackColor || 'rgba(0, 0, 0, 0.5)'};
                border-radius: 5px;
                box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.8);
            }
            #crt-content::-webkit-scrollbar-thumb {
                background: ${scrollbar.thumbColor || 'rgba(0, 255, 2, 0.4)'};
                border-radius: 5px;
                box-shadow: 
                    inset 0 0 5px rgba(0, 255, 2, 0.6),
                    0 0 5px rgba(0, 255, 2, 0.3);
            }
            #crt-content::-webkit-scrollbar-thumb:hover {
                background: ${scrollbar.thumbHoverColor || 'rgba(0, 255, 2, 0.6)'};
                box-shadow: 
                    inset 0 0 5px rgba(0, 255, 2, 0.8),
                    0 0 8px rgba(0, 255, 2, 0.5);
            }
            `;
        }
        
        style.textContent = css;
    }
    
    // ==================== 光标样式 ====================
    function applyCursorStyle() {
        var cursor = config.typing?.cursor || {};
        var cursorElem = document.querySelector('.typing-cursor');
        if (cursorElem) {
            cursorElem.textContent = cursor.char || '■';
            if (cursor.blinkSpeed) {
                cursorElem.style.animation = `blink ${cursor.blinkSpeed}ms infinite`;
            }
        }
    }
    
    // ==================== 自动滚动 ====================
    function setupAutoScroll() {
        if (!config.autoScroll?.enabled) return;
        
        var output = document.getElementById('output');
        var threshold = config.autoScroll.threshold || 100;
        var behavior = config.autoScroll.behavior || 'smooth';
        
        var observer = new MutationObserver(function() {
            var currentHeight = output.scrollHeight;
            if (currentHeight - lastScrollHeight > threshold) {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: behavior
                });
                lastScrollHeight = currentHeight;
            }
        });
        
        observer.observe(output, { childList: true, subtree: true });
    }
    
    // ==================== 交互控制 ====================
    function setupInteraction() {
        var interaction = config.interaction || {};
        
        document.addEventListener('keydown', function(e) {
            if (!currentTyping) return;
            
            if (e.code === 'Space' && interaction.allowPause) {
                e.preventDefault();
                if (isPaused) {
                    currentTyping.resume();
                    isPaused = false;
                } else {
                    currentTyping.pause();
                    isPaused = true;
                }
            }
            
            if (e.code === 'Escape' && interaction.allowSkip) {
                if (currentTyping) {
                    currentTyping.pause();
                }
            }
        });
    }
    
    // ==================== 背景音乐 ====================
    function setupAudio(callback) {
        var audioConfig = config.audio || {};
        
        if (!audioConfig.enabled) {
            if (callback) callback();
            return;
        }
        
        var audio = new Audio(audioConfig.source || './assets/music/Mona-Lisa-Overdrive.mp3');
        audio.volume = 0;
        audio.loop = audioConfig.loop !== false;
        audioInstance = audio;
        
        function playAudio() {
            var targetVolume = audioConfig.volume || 0.5;
            var fadeInDuration = audioConfig.fadeInDuration || 2000;
            var steps = 50;
            var stepDuration = fadeInDuration / steps;
            var volumeIncrement = targetVolume / steps;
            var currentStep = 0;
            
            audio.play().then(function() {
                var fadeIn = setInterval(function() {
                    if (currentStep < steps) {
                        audio.volume = Math.min(volumeIncrement * currentStep, targetVolume);
                        currentStep++;
                    } else {
                        clearInterval(fadeIn);
                    }
                }, stepDuration);
            }).catch(function(error) {
                console.log('音乐播放失败:', error);
            });
        }
        
        // 显示启动提示
        if (audioConfig.prompt && audioConfig.prompt.enabled) {
            showAudioPrompt(audioConfig.prompt, function(userChoice) {
                if (userChoice) {
                    playAudio();
                }
                // 用户选择后继续执行
                if (callback) callback();
            }, audio);
        } else {
            if (audioConfig.autoplay !== false) {
                playAudio();
            }
            if (callback) callback();
        }
        
        // 显示控制按钮
        if (audioConfig.showControls) {
            createAudioControlButton(audio);
        }
    }
    
    // 显示音乐启动提示
    function showAudioPrompt(promptConfig, callback, audio) {
        var message = promptConfig.message || '惊险高速，是否进行重装上阵？';
        var yesText = promptConfig.yesText || '是';
        var noText = promptConfig.noText || '否';
        var autoDelay = promptConfig.autoSelectDelay || 3000;
        var defaultChoice = promptConfig.defaultChoice || 'yes';
        
        var promptBox = document.createElement('div');
        promptBox.id = 'audio-prompt';
        promptBox.style.cssText = `
            position: fixed;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.95);
            border: 2px solid #00ff00;
            padding: 30px 40px;
            border-radius: 5px;
            z-index: 10001;
            box-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
            font-family: 'Courier New', monospace;
            color: #00ff00;
            text-align: center;
            min-width: 400px;
            max-width: 600px;
        `;
        
        var messageDiv = document.createElement('div');
        messageDiv.style.cssText = 'font-size: 18px; margin-bottom: 20px; line-height: 1.6;';
        messageDiv.textContent = message;
        promptBox.appendChild(messageDiv);
        
        var countdownDiv = document.createElement('div');
        countdownDiv.style.cssText = 'font-size: 14px; color: #00ff88; margin-bottom: 20px;';
        var countdown = Math.ceil(autoDelay / 1000);
        countdownDiv.textContent = `${countdown} 秒后自动关闭窗口`;
        promptBox.appendChild(countdownDiv);
        
        var buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'display: flex; gap: 20px; justify-content: center;';
        
        function createButton(text, isYes) {
            var btn = document.createElement('button');
            btn.textContent = text;
            btn.style.cssText = `
                padding: 12px 30px;
                font-size: 16px;
                font-family: 'Courier New', monospace;
                background: rgba(0, 255, 0, 0.1);
                border: 2px solid #00ff00;
                color: #00ff00;
                cursor: pointer;
                border-radius: 3px;
                transition: all 0.3s;
                min-width: 100px;
            `;
            
            btn.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(0, 255, 0, 0.3)';
                this.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.6)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.background = 'rgba(0, 255, 0, 0.1)';
                this.style.boxShadow = 'none';
            });
            
            btn.addEventListener('click', function() {
                clearInterval(countdownTimer);
                document.body.removeChild(promptBox);
                callback(isYes);
            });
            
            return btn;
        }
        
        var yesBtn = createButton(yesText, true);
        var noBtn = createButton(noText, false);
        
        buttonContainer.appendChild(yesBtn);
        buttonContainer.appendChild(noBtn);
        promptBox.appendChild(buttonContainer);
        
        document.body.appendChild(promptBox);
        
        var countdownTimer = setInterval(function() {
            countdown--;
            if (countdown > 0) {
                countdownDiv.textContent = `${countdown} 秒后自动关闭窗口`;
            } else {
                clearInterval(countdownTimer);
                document.body.removeChild(promptBox);
                callback(defaultChoice === 'yes');
            }
        }, 1000);
    }
    
    // 创建音乐控制按钮
    function createAudioControlButton(audio) {
        var controlBtn = document.createElement('button');
        controlBtn.id = 'audio-control';
        controlBtn.innerHTML = '🔊';
        controlBtn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: rgba(0, 255, 0, 0.2);
            border: 2px solid rgba(0, 255, 0, 0.5);
            color: #00ff00;
            font-size: 24px;
            cursor: pointer;
            z-index: 9999;
            transition: all 0.3s;
        `;
        
        var isPlaying = true;
        controlBtn.addEventListener('click', function() {
            if (isPlaying) {
                audio.pause();
                controlBtn.innerHTML = '🔇';
                controlBtn.style.background = 'rgba(255, 0, 0, 0.2)';
                controlBtn.style.borderColor = 'rgba(255, 0, 0, 0.5)';
            } else {
                audio.play();
                controlBtn.innerHTML = '🔊';
                controlBtn.style.background = 'rgba(0, 255, 0, 0.2)';
                controlBtn.style.borderColor = 'rgba(0, 255, 0, 0.5)';
            }
            isPlaying = !isPlaying;
        });
        
        controlBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.5)';
        });
        
        controlBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
        
        document.body.appendChild(controlBtn);
    }
    
    // ==================== 内容加载 ====================
    function loadContent() {
        var contentConfig = config.content || {};
        
        if (config.accessibility?.reduceMotion) {
            console.log('Accessibility: reduceMotion enabled, disabling typing');
            if (!config.typing) config.typing = {};
            config.typing.enabled = false;
        }
        
        console.log('Loading content from:', contentConfig.source || 'content.md');
        
        fetch(contentConfig.source || 'content.md')
            .then(response => response.text())
            .then(markdown => {
                var separator = contentConfig.separator || '---';
                var parts = markdown.split(separator);
                var loginHeader = contentConfig.loginHeader || '# 登录信息';
                var mainHeader = contentConfig.mainHeader || '# 主要内容';
                
                var loginSection = parts[0].replace(loginHeader + '\n', '').trim();
                var mainSection = parts[1].replace(mainHeader + '\n', '').trim();
                
                var loginSource = document.createElement('div');
                loginSource.id = 'login-source';
                loginSource.style.display = 'none';
                loginSource.innerHTML = loginSection.replace(/\n/g, '<br>');
                document.body.appendChild(loginSource);
                
                var mainSource = document.createElement('div');
                mainSource.id = 'main-source';
                mainSource.style.display = 'none';
                mainSource.innerHTML = marked.parse(mainSection);
                document.body.appendChild(mainSource);
                
                // 新顺序：登录 → 字幕雨 → 内容
                startLoginTyping();
            })
            .catch(error => {
                if (config.debug?.consoleLog) {
                    console.error('Error loading content:', error);
                }
            });
    }
    
    // ==================== 登录打字效果 ====================
    function startLoginTyping() {
        var typingConfig = config.typing || {};
        var output = document.getElementById('output');
        var cursor = document.querySelector('.typing-cursor');
        
        console.log('Starting login typing...');
        
        // 移除光标（稍后 Typing 会在打字时重新添加）
        if (cursor && cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
        }
        
        if (typingConfig.enabled === false) {
            var loginSource = document.getElementById('login-source');
            output.innerHTML = loginSource.innerHTML;
            setTimeout(function() {
                output.innerHTML = '';
                showMatrixThenContent();
            }, 1000);
            return;
        }
        
        currentTyping = new Typing({
            source: document.getElementById('login-source'),
            output: output,
            cursor: cursor,
            delay: typingConfig.loginSpeed || 80,
            done: function() {
                console.log('Login typing done');
                var pauseDuration = typingConfig.loginPauseDuration || 1000;
                setTimeout(function() {
                    // 清空内容时保存光标
                    var currentCursor = document.querySelector('.typing-cursor');
                    if (currentCursor && currentCursor.parentNode) {
                        currentCursor.parentNode.removeChild(currentCursor);
                    }
                    output.innerHTML = '';
                    showMatrixThenContent();
                }, pauseDuration);
            }
        });
        
        currentTyping.start();
    }
    
    // ==================== Matrix + 内容 ====================
    function showMatrixThenContent() {
        // 启动 Matrix 效果
        if (matrixEffect.isEnabled()) {
            console.log('Starting Matrix effect...');
            matrixEffect.start();
        }
        
        // 4秒后停止 Matrix，开始显示内容
        setTimeout(function() {
            matrixEffect.stop();
            console.log('Matrix stopped, starting main content...');
            startMainContent();
        }, 4000);
    }
    
    // ==================== 主内容打字 ====================
    function startMainContent() {
        var typingConfig = config.typing || {};
        var output = document.getElementById('output');
        
        // 重新获取或创建光标
        var cursor = document.querySelector('.typing-cursor');
        if (!cursor) {
            // 如果光标不存在，创建一个新的
            cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            cursor.textContent = config.typing?.cursor?.char || '■';
        } else if (cursor.parentNode) {
            // 如果光标存在且在 DOM 中，移除它
            cursor.parentNode.removeChild(cursor);
        }
        
        output.innerHTML = '';
        
        if (typingConfig.enabled === false) {
            var mainSource = document.getElementById('main-source');
            output.innerHTML = mainSource.innerHTML;
            return;
        }
        
        currentTyping = new Typing({
            source: document.getElementById('main-source'),
            output: output,
            cursor: cursor,
            delay: typingConfig.mainSpeed || 60,
            done: function() {
                console.log('Main content typing done');
                currentTyping = null;
                
                // 优先级：自动跳转 > 自动循环
                if (AutoRedirect.isEnabled()) {
                    AutoRedirect.start();
                } else {
                    AutoLoop.start();
                }
            }
        });
        
        currentTyping.start();
    }
    
    // ==================== 初始化 ====================
    function init() {
        console.log('Initializing terminal application...');
        
        applyMetadata();
        applyTheme();
        applyCursorStyle();
        setupAutoScroll();
        setupInteraction();
        
        // 初始化 Matrix 效果
        matrixEffect = MatrixEffect;
        matrixEffect.init(config.matrix || {});
        
        // 初始化自动循环控制器
        var autoLoopConfig = config.typing?.autoLoop || {};
        AutoLoop.init(autoLoopConfig, function() {
            // 重启回调：清空内容并重新开始
            var output = document.getElementById('output');
            var currentCursor = document.querySelector('.typing-cursor');
            if (currentCursor && currentCursor.parentNode) {
                currentCursor.parentNode.removeChild(currentCursor);
            }
            output.innerHTML = '';
            startLoginTyping();
        });
        
        // 初始化自动跳转控制器
        var autoRedirectConfig = config.typing?.autoRedirect || {};
        AutoRedirect.init(autoRedirectConfig);
        
        // 预加载背景图片
        var bgImage = new Image();
        bgImage.src = './assets/imgs/monitor.jpg';
        
        bgImage.onload = bgImage.onerror = function() {
            var screen = document.getElementById('crt-screen');
            screen.style.transition = 'opacity 300ms';
            screen.style.opacity = '1';
            
            // 先设置音频（阻塞直到用户选择），然后加载内容
            setupAudio(function() {
                console.log('Audio setup complete, loading content...');
                loadContent();
            });
        };
    }
    
    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
