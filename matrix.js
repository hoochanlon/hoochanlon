/**
 * Matrix 字幕雨效果模块
 * 根据 TerminalConfig.matrix 配置动态初始化
 */

var MatrixEffect = (function() {
    var matrix, matrixCtx, matrixContainer;
    var fontSize, drops, str, w, h, cols;
    var config, intervalId;
    
    function init(userConfig) {
        config = userConfig || {};
        
        // 如果未启用，直接返回
        if (!config.enabled) {
            return {
                start: function() {},
                stop: function() {},
                isEnabled: function() { return false; }
            };
        }
        
        matrix = document.getElementById("matrix");
        if (!matrix) return;
        
        matrixCtx = matrix.getContext("2d");
        matrixContainer = document.getElementById("crt-content");
        
        // 从配置读取参数
        fontSize = config.fontSize || 15;
        str = config.charset || "01";
        w = 0;
        h = 0;
        cols = 0;
        drops = [];
        
        resizeMatrix();
        window.addEventListener("resize", resizeMatrix);
    }
    
    function resizeMatrix() {
        if (!matrixContainer) return;
        w = matrixContainer.clientWidth;
        h = matrixContainer.clientHeight;
        matrix.width = w;
        matrix.height = h;
        cols = Math.floor(w / fontSize);
        drops = Array(cols).fill(0);
    }
    
    function drawStr() {
        var fadeOpacity = config.fadeOpacity || 0.05;
        var color = config.color || "#00ff00";
        var fontFamily = config.fontFamily || "微软雅黑";
        var fontWeight = config.fontWeight || 600;
        var resetProbability = config.resetProbability || 0.99;
        
        matrixCtx.fillStyle = "rgba(0, 0, 0, " + fadeOpacity + ")";
        matrixCtx.fillRect(0, 0, w, h);
        matrixCtx.font = fontWeight + " " + fontSize + "px " + fontFamily;
        matrixCtx.fillStyle = color;

        for (var i = 0; i < cols; i++) {
            var x = i * fontSize;
            var y = drops[i] * fontSize;
            matrixCtx.fillText(str[Math.floor(Math.random() * str.length)], x, y);

            if (y > h && Math.random() > resetProbability) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    function start() {
        if (!config.enabled || intervalId) return;
        var refreshInterval = config.refreshInterval || 30;
        intervalId = setInterval(drawStr, refreshInterval);
        if (matrix) {
            matrix.style.opacity = '0.3';
        }
    }
    
    function stop() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        if (matrix) {
            matrix.style.opacity = '0';
        }
    }
    
    function isEnabled() {
        return config.enabled === true;
    }
    
    return {
        init: init,
        start: start,
        stop: stop,
        isEnabled: isEnabled
    };
})();