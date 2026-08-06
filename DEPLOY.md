# 部署指南

## 当前状态

✅ Hugo 站点已配置完成  
✅ CRT 终端项目已集成到 `/static/hcl/`  
✅ GitHub Actions 自动部署已配置  
✅ 本地开发服务器运行中: http://localhost:1315/

## 部署到 GitHub Pages

### 1. 检查 GitHub 仓库设置

1. 访问 GitHub 仓库：https://github.com/hoochanlon/hoochanlon
2. 进入 **Settings** > **Pages**
3. **Source** 选择：**GitHub Actions**

### 2. 推送代码

```bash
# 查看修改状态
git status

# 添加所有修改
git add .

# 提交
git commit -m "Migrate to Hugo site with Lynx theme

- Convert to Hugo-based personal homepage
- Integrate CRT terminal project in static/hcl/
- Add GitHub Actions auto-deployment
- Mobile responsive design for CRT terminal"

# 推送到 GitHub
git push origin main
```

### 3. 自动部署

推送后，GitHub Actions 会自动：
1. 构建 Hugo 站点
2. 部署到 GitHub Pages
3. 几分钟后访问：https://hoochanlon.github.io/

### 4. 访问页面

- **主页**: https://hoochanlon.github.io/
- **CRT 终端**: https://hoochanlon.github.io/hcl/

## 本地测试

```bash
# 启动开发服务器
hugo server -D

# 访问
# 主页: http://localhost:1313/
# CRT: http://localhost:1313/hcl/
```

## 故障排查

### GitHub Actions 构建失败

1. 查看 Actions 页面的错误日志
2. 常见问题：
   - Hugo 版本不匹配
   - 主题路径错误
   - 权限设置问题

### 页面无法访问

1. 确认 GitHub Pages 已启用
2. 检查仓库是否为 public
3. 等待几分钟让 DNS 生效

### CRT 终端页面 404

确保 `static/hcl/` 目录包含完整文件，特别是 `index.html`

## 自定义域名（可选）

1. 在 `static/` 目录创建 `CNAME` 文件
2. 文件内容为你的域名，例如：`example.com`
3. 在域名提供商添加 CNAME 记录指向 `hoochanlon.github.io`

## 更新内容

编辑 `config.toml` 和 `content/_index.md` 后：

```bash
git add .
git commit -m "Update content"
git push
```

GitHub Actions 会自动重新部署。
