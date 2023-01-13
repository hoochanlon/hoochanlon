# 👋 欢迎来到我的 GitHub 个人主页

## 加速，全速热爱(All on One)

* [DownGit，Github库文件下载](https://minhaskamal.github.io/DownGit/#/home)
* [ghproxy GitHub软件下载](https://ghproxy.com)
* [Thanks-Mirror，各类包镜像源加速](https://github.com/eryajf/Thanks-Mirror)
* [ineo6/hosts，GitHub相关访问加速](https://github.com/ineo6/hosts)
* [Watt Toolkit，Steam等游戏平台访问加速](https://steampp.net)
* [glados，访问不可达的404搜索等](https://github.com/glados-network/)



### let me see see

1. 在终端“窗口”选项，选择拼贴为窗口组，类似浏览器的新标签页。
2. 终端app：[warp](https://www.warp.dev)、[tabby](https://tabby.sh)。
3. 完全是终端界面才用vim，平时将code作为默认编辑实际上够了。
4. 将gitHub.com换成github.dev，关闭窗口也不怕文本丢失，vscode提交就行。
5. `sudo -S`之后的`sudo`不再输密码，终端挂载不休眠`caffeinate`

vim (突发急用时)

```
* 模糊搜索、搜索、跳行
* 复制、粘贴
* 定位删除、修改固定单词。
* 剪切
* 定位关标到某个位置
```


<details><summary><i><b>终端代理设置</b></i></summary>

### 即便是全局模式，终端也是不走代理的，需另设

Mac终端配置http和https访问代理

```
export all_proxy=socks5://127.0.0.1:1080
```

取消代理

```
unset all_proxy
```

用 https://cip.cc 判断软件是否走了代理通道

```
curl cip.cc
```

参考：

* [新宿老仙](https://blog.csdn.net/u010693630/article/details/127410392)
* [冰糖葫芦很乖](https://www.cnblogs.com/Galesaur-wcy/p/15947012.html)
* [macOS终端使用代理网络](https://github.com/Qingquan-Li/blog/issues/131)

配置好终端代理，可不用配置git代理，这里仅作为附录。

```
# 配置Git的代理设置
git config --global http.proxy 'socks5://127.0.0.1:1080' 
git config --global https.proxy 'socks5://127.0.0.1:1080'

# 取消Git的代理设置
git config --global --unset https.proxy 
git config --global --unset http.proxy
```
</details>

<details><summary><i><b>个人常用的shell for Mac </b></i></summary>

### bash & zsh

#### 查看系统信息

```
brew install neofetch && neofetch
```
#### 原生查看系统信息并简化

* 将指令参数等重命名为`systeminfo`，简化命令字母单词
* `>>` 并写配置文件` ~/.zshrc`永久保存

```
echo "alias systeminfo='system_profiler SPSoftwareDataType SPHardwareDataType'" >> ~/.zshrc
```

#### 对查看IP地址命令进行简化，`ip`

内网

```
echo "alias ip=ipconfig getifaddr en0" >> ~/.zshrc
```

外网

```
curl cip.cc
```

参考：https://www.yundongfang.com/Yun124125.html


#### 查看磁盘空间

```
brew install duf && duf --all
```

#### 查看隐藏文件

```
ls -al
```


#### 简化解除软件门禁指令

保存别名到存档配置文件，已软件签名为例

* ls >> test.txt 定向输入到文件，echo 输入可自动换行
* 配置存档 for Mac，新版为`~/.zshrc`
* 参考：https://blog.csdn.net/weixin_26737625/article/details/108259518

```
echo "alias sign='sudo xattr -d com.apple.quarantine'" >> ~/.zshrc
```

### [Nigate Free-NTFS-for-Mac](https://github.com/hoochanlon/Free-NTFS-for-Mac)

#### Homebrew(Mac、Linux)

```
 /bin/bash -c "$(curl -fsSL https://gitee.com/ineo6/homebrew-install/raw/master/install.sh)"
```

#### 下载文件内容写入到某个位置

参考：https://baijiahao.baidu.com/s?id=1714333474878440110

```
curl https://fastly.jsdelivr.net/gh/hoochanlon/Free-NTFS-for-Mac/nigate.sh > ~/Public/nigate.sh
```
#### 在线执行脚本

* `/bin/bash -c`使用bash执行
* `-fsSL`
  * -f(--fail) — 表示在服务器错误时，阻止一个返回的表示错误原因的 HTML 页面
  * -L(--location) — 参数会让 HTTP 请求跟随服务器的重定向。
  * -S(--show-error) — 指定只输出错误信息，通常与 -s 一起使用。
  * -s(--silent) — 不显示错误和进度信息。
* 参考：https://blog.csdn.net/weixin_46267040/article/details/125370144

```
/bin/bash -c "$(curl -fsSL https://cdn.statically.io/gh/hoochanlon/Free-NTFS-for-Mac/main/nigate.sh)"
```


#### 指令别名与文件软链接

说人话就是把长的命令变成几个字母的单词（别名），文件建立个快捷方式（软链接）

* 文件类型需要用到软链接，不能用别名，别名只适用于命令
* 别名只能生效于本机已存在的文件，curl 那么就用不了了
* macOS创建软链接： https://blog.csdn.net/guokaigdg/article/details/89457317

```
sudo /usr/local/bin ln -s  \
~/Public/nigate.sh nigate.shortcut \
&& echo "alias nigate='bash nigate.shortcut'" >> ~/.zshrc
```


### [GitLab图床搭建](https://gitlab.com/hoochanlon/img-start-2023)

#### 生成 ssh key 并复制密钥内容

```
ssh-keygen -t rsa -b 4096 -C \
"youmail@outlook.com" \
&&  pbcopy <  ~/.ssh/id_rsa.pub

```

#### 测试链接

```
ssh -T git@gitlab.com
```

</details>


<!--

环境变量检测 sh
（python、ruby、node、yarn、xcode、ohmyzsh）

解压

代理

easy- Mac-shell


-->



![ ](https://raw.githubusercontent.com/hoochanlon/hoochanlon/master/assets/github-contribution-grid-snake.svg)
