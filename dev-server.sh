#!/bin/bash
# Hugo 本地开发服务器启动脚本
# ./dev-server.sh

PORT=1314

echo "🚀 启动 Hugo 开发服务器..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 检查端口是否被占用
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  端口 $PORT 已被占用"
    echo "正在停止占用该端口的进程..."
    
    # 获取占用端口的进程 PID
    PID=$(lsof -ti:$PORT)
    
    if [ -n "$PID" ]; then
        kill -9 $PID 2>/dev/null
        echo "✅ 已停止进程 (PID: $PID)"
        sleep 1
    fi
fi

echo "✨ 启动新的服务器实例..."
echo "📍 访问地址: http://localhost:$PORT/"
echo "🛑 按 Ctrl+C 停止服务器"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 启动 Hugo 服务器
hugo server -D --bind 127.0.0.1 --port $PORT --baseURL http://localhost:$PORT/
