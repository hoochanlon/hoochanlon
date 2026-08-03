/**
 * Auto Redirect Controller
 * 自动跳转控制器
 * 
 * 职责：管理内容播放完成后的自动跳转逻辑
 */

(function() {
    var AutoRedirect = {
        config: null,
        timeoutId: null,
        intervalId: null,
        countdown: 0,
        
        /**
         * 初始化跳转控制器
         * @param {Object} config - 配置对象
         */
        init: function(config) {
            this.config = config || {};
            console.log('AutoRedirect initialized:', this.config);
        },
        
        /**
         * 检查是否启用自动跳转
         */
        isEnabled: function() {
            return this.config.enabled === true && this.config.url;
        },
        
        /**
         * 获取延迟时间
         */
        getDelay: function() {
            return this.config.delay || 10000;
        },
        
        /**
         * 获取目标URL
         */
        getUrl: function() {
            return this.config.url || '';
        },
        
        /**
         * 是否显示倒计时提示
         */
        shouldShowCountdown: function() {
            return this.config.showCountdown !== false;
        },
        
        /**
         * 创建倒计时提示元素
         */
        createCountdownElement: function() {
            var elem = document.createElement('div');
            elem.id = 'redirect-countdown';
            elem.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.8);
                color: #00ff00;
                padding: 15px 25px;
                border: 1px solid #00ff00;
                border-radius: 5px;
                font-family: 'Courier New', monospace;
                font-size: 14px;
                z-index: 9999;
                box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
                text-shadow: 0 0 5px #00ff00;
            `;
            return elem;
        },
        
        /**
         * 更新倒计时显示
         */
        updateCountdown: function(seconds) {
            var elem = document.getElementById('redirect-countdown');
            if (elem) {
                elem.textContent = this.config.countdownText
                    ? this.config.countdownText.replace('{seconds}', seconds)
                    : '将在 ' + seconds + ' 秒后跳转...';
            }
        },
        
        /**
         * 移除倒计时元素
         */
        removeCountdownElement: function() {
            var elem = document.getElementById('redirect-countdown');
            if (elem && elem.parentNode) {
                elem.parentNode.removeChild(elem);
            }
        },
        
        /**
         * 执行跳转
         */
        redirect: function() {
            var url = this.getUrl();
            console.log('AutoRedirect: redirecting to', url);
            
            // 根据配置选择跳转方式
            if (this.config.openInNewTab) {
                window.open(url, '_blank');
            } else {
                window.location.href = url;
            }
        },
        
        /**
         * 启动跳转计时器
         */
        start: function() {
            if (!this.isEnabled()) {
                console.log('AutoRedirect: disabled or no URL configured');
                return;
            }
            
            var delay = this.getDelay();
            this.countdown = Math.ceil(delay / 1000);
            
            console.log('AutoRedirect: scheduling redirect in', delay, 'ms');
            
            // 显示倒计时
            if (this.shouldShowCountdown()) {
                var countdownElem = this.createCountdownElement();
                document.body.appendChild(countdownElem);
                this.updateCountdown(this.countdown);
                
                // 每秒更新倒计时
                var self = this;
                this.intervalId = setInterval(function() {
                    self.countdown--;
                    if (self.countdown > 0) {
                        self.updateCountdown(self.countdown);
                    }
                }, 1000);
            }
            
            // 设置跳转定时器
            var self = this;
            this.timeoutId = setTimeout(function() {
                self.removeCountdownElement();
                if (self.intervalId) {
                    clearInterval(self.intervalId);
                    self.intervalId = null;
                }
                self.redirect();
            }, delay);
        },
        
        /**
         * 停止跳转计时器
         */
        stop: function() {
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
                this.timeoutId = null;
                console.log('AutoRedirect: stopped');
            }
            
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
            
            this.removeCountdownElement();
        },
        
        /**
         * 重置跳转计时器
         */
        reset: function() {
            this.stop();
            this.start();
        }
    };
    
    // 导出到全局
    if (typeof window !== 'undefined') {
        window.AutoRedirect = AutoRedirect;
    }
    
    // 支持 CommonJS
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = AutoRedirect;
    }
})();
