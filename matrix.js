var matrix = document.getElementById("matrix");
var matrixCtx = matrix.getContext("2d");
var matrixContainer = document.getElementById("crt-content");
var fontSize = 15;
var drops = [];
var str = "01";
var w = 0;
var h = 0;
var cols = 0;

function resizeMatrix() {
    w = matrixContainer.clientWidth;
    h = matrixContainer.clientHeight;
    matrix.width = w;
    matrix.height = h;
    cols = Math.floor(w / fontSize);
    drops = Array(cols).fill(0);
}

function drawStr() {
    matrixCtx.fillStyle = "rgba(0, 0, 0, 0.05)";
    matrixCtx.fillRect(0, 0, w, h);
    matrixCtx.font = "600 " + fontSize + "px 微软雅黑";
    matrixCtx.fillStyle = "#00ff00";

    for (var i = 0; i < cols; i++) {
        var x = i * fontSize;
        var y = drops[i] * fontSize;
        matrixCtx.fillText(str[Math.floor(Math.random() * str.length)], x, y);

        if (y > h && Math.random() > 0.99) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

resizeMatrix();
window.addEventListener("resize", resizeMatrix);
setInterval(drawStr, 30);