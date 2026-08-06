/**
 * Auto Loop Controller
 * 自动循环播放控制器
 * 
 * 职责：管理内容的自动循环播放逻辑
 */

(function() {
    var AutoLoop = {
        config: null,
        restartCallback: null,
        timeoutId: null,
        
        /**
         * 初始化循环控制器
         * @param {Object} config - 配置对象
         * @param {Function} restartCallback - 重启播放的回调函数
         */
        init: function(config, restartCallback) {
            this.config = config || {};
            this.restartCallback = restartCallback;
            console.log('AutoLoop initialized:', this.config);
        },
        
        /**
         * 检查是否启用自动循环
         */
        isEnabled: function() {
            return this.config.enabled === true;
        },
        
        /**
         * 获取延迟时间
         */
        getDelay: function() {
            return this.config.delayAfterComplete || 5000;
        },
        
        /**
         * 启动循环计时器
         */
        start: function() {
            if (!this.isEnabled()) {
                console.log('AutoLoop: disabled, skipping');
                return;
            }
            
            var delay = this.getDelay();
            console.log('AutoLoop: scheduling restart in', delay, 'ms');
            
            var self = this;
            this.timeoutId = setTimeout(function() {
                console.log('AutoLoop: restarting...');
                if (typeof self.restartCallback === 'function') {
                    self.restartCallback();
                }
            }, delay);
        },
        
        /**
         * 停止循环计时器
         */
        stop: function() {
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
                this.timeoutId = null;
                console.log('AutoLoop: stopped');
            }
        },
        
        /**
         * 重置循环计时器
         */
        reset: function() {
            this.stop();
            this.start();
        }
    };
    
    // 导出到全局
    if (typeof window !== 'undefined') {
        window.AutoLoop = AutoLoop;
    }
    
    // 支持 CommonJS
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = AutoLoop;
    }
})();
