var matrix = document.getElementById("matrix");
var matrixCtx = matrix.getContext("2d");
/**
获取客户端的宽度和高度，并设置画板的宽高
自适应屏幕参考： https://blog.csdn.net/qq_39687901/article/details/104071957
*/
var w = document.documentElement.clientWidth;
var h = document.documentElement.clientHeight;
matrix.width = w;
matrix.height = h;
//设置文字大小 
var fontSize = 15;
//计算一行有多少个文字 取整数 向下取整
var cols = Math.floor(w / fontSize);
//创建数组把cols 个 0 （y坐标存储起来）
var drops = [];
var str = "01";
//往数组里面添加 cols 个 0
for (var i = 0; i < cols; i++) {
    drops.push(0);
}

function drawStr() {
    //给矩形设置填充色
    matrixCtx.fillStyle = "#0000000d"
    //绘制一个矩形
    matrixCtx.fillRect(0, 0, w, h);

    //增设文字样式及颜色
    matrixCtx.font = "600 " + fontSize + "px 微软雅黑";
    matrixCtx.fillStyle = "#00ff00";

    for (var i = 0; i < cols; i++) {
        //x坐标
        var x = i * fontSize;
        //y坐标
        var y = drops[i] * fontSize;
        //随机生成
        matrixCtx.fillText(str[Math.floor(Math.random() * str.length)], x, y);
        if (y > h && Math.random() > 0.99) {
            drops[i] = 0;
        }
        drops[i]++;
    }

}
//每隔30毫秒执行一次
setInterval(drawStr, 30);
