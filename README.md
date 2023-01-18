# Hoo！Gist.

## 书签与表单

✨ <a href="http://www.gxlib.org.cn">广西壮族自治区图书馆</a>   &nbsp;<a href="http://rdbk1.ynlib.cn:6251">中国人民大学复印周刊</a>   &nbsp;<a href="https://clibrary.top">Clib</a>  &nbsp;<a href="https://forum.freemdict.com">词典论坛</a>  &nbsp;<a href="https://www.jyxxh.cn">教育信息化</a>

🔖 <a href="https://www.ncpssd.org">国家哲学社会科学文献中心</a>   &nbsp;<a href="https://data.stats.gov.cn/easyquery.htm?cn=C01">国家统计局</a>  &nbsp;<a href="https://www.gsxt.gov.cn/index.html">国家企业信用信息公示系统</a> 

🔎 <a href="https://res.wokanxing.info/jpgramma/index.html">日语文法</a>  &nbsp;<a href="https://so-zou.jp/web-app/text/proofreading/#word0">文法检查</a>   &nbsp;<a href="https://kousei.club/校正・校閲で使う記号・符号［基本的な約物の意/#:~:text=約物一覧［基本的な記号・符号の意味と使い方］%201%201%EF%BC%8Eくぎり符%20文章・語句の区切りを明らかにするもの%E3%80%82%20ex%EF%BC%8E句読点・コンマ・ピリオドなど%202%202%EF%BC%8Eくくり符%20文章・語句の前後をくくるもの%E3%80%82,感嘆符・疑問符など%20記号と符号の違い%20「記号」は広く、言語・文字・各種のしるし・身振りなどを含む%E3%80%82%20「文」は漢字であると同時に、地図では学校を示す記号である%E3%80%82%20「符号」は、文字を除き、図形・音声・光・電波などのしるしについて使うことが多い%E3%80%82%20記号と符号の相違にはあいまいな面もある%E3%80%82%20目印として付けた〇は符号だが、地図上の〇は記号である%E3%80%82%20">约物假名表</a>  &nbsp;<a href="http://www.kawa.net/works/ajax/romanize/japanese.html">汉字罗马注音</a> &nbsp;<a href="https://soukaapp.com/dict/">日语词典</a>  &nbsp;<a href="https://www.sljfaq.org/cgi/e2k_ja.cgi">英语互转片假</a>


|  应用访达表   |                                                              |
| :-----------: | :----------------------------------------------------------: |
| Mac & Windows | [Awesome-Mac](https://github.com/jaywcjlove/awesome-mac)、[Awesome-Windows](https://github.com/Awesome-Windows/Awesome) |
|    GitHub     | [DownGit](https://minhaskamal.github.io/DownGit/#/home)、[ineo6/hosts](https://github.com/ineo6/hosts) |
|    KOUGUBA    | <a href="https://www.warp.dev">warp</a>、  <a href="https://tabby.sh">tabby</a> 、[Watt Toolkit](https://steampp.net)、[SwitchHosts](https://github.com/oldj/SwitchHosts)、[DNSCrypt](https://github.com/DNSCrypt/dnscrypt-proxy) |
|   BUIPIENU    | [westworld](mailto:info@westworldss.com)、[samsocks](https://www.samsock.com)、[glados](https://github.com/glados-network/)、[proton](https://protonvpn.com) |


<!--

http://software.jsnu.edu.cn 江苏师范大学正版软件服务平台

-->


## 指令速记即用

`sudo -S`之后的操作可不用输密码；终端挂载不休眠`caffeinate`，以及安装` neofetch` 可查看系统资料。

<details><summary>vim日常操作</summary>

---
* 显示行数，`set nu`，删除当前行，`dd`；删除X-Y行，`24,30d`。
* 将X-Y行复制，`24，30 copy`；将X-Y行剪切至Z行，`24,30 move 10`。
* 将所有星号替换为减号，`%s/*/-/`；定位特定行，替换字符，`10,50s/word1/word2/`。
* “yy”复制当前行；p贴在下一行；重复上回单次操作键盘“.”。
* ”u“撤销，”ctrl+r” 前进。
---

</details>

<details><summary>个人常用的shell for Mac </summary>

### bash & zsh

#### 简化解除软件门禁指令

保存别名到存档配置文件，已软件签名为例

* ls >> test.txt 定向输入到文件，echo 输入可自动换行
* 配置存档 for Mac，新版为`~/.zshrc`
* 参考：[Catalina以后的系统添加别名](https://blog.csdn.net/weixin_26737625/article/details/108259518)、[macOS Command - xattr](https://blog.csdn.net/lovechris00/article/details/113060237)

```
echo "alias sign='sudo xattr -d com.apple.quarantine'" >> ~/.zshrc
```

#### 终端商店与安装允许任何来源

mas

```
brew install mas
mas search bear
mas install 1091189122
```

允许任何来源

```
sudo spctl --master-disable
```

#### 截图

更改默认前缀

```
defaults write com.apple.screencapture name "catch"
```

更改截图文件类型jpg

```
defaults write com.apple.screencapture type jpg
```


#### 查看系统启动时间及信息

启动时间

```
uptime
```

系统信息

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


####  清除DNS缓存

```
sudo dscacheutil -flushcache
```

#### 查看磁盘空间

```
brew install duf && duf --all
```

#### 查看隐藏文件

```
ls -al
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

提一嘴无关紧要的[终端小游戏](http://www.nndssk.com/xtwt/1479093c5Wg3.html)

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
![ ](https://raw.githubusercontent.com/hoochanlon/hoochanlon/master/assets/github-contribution-grid-snake.svg)
-->


<div align="center">

---

 <b><i><a href="https://hoochanlon.github.io/hoochanlon">About me</a></i></b> <br>
 <b><i>Love with Typora/vs code/Vim+ Squoosh & PicGo </i></b>

</div>
