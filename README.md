# Hoo！Gist.

即是开箱即用的参考资料，同时也是GitHub的个人首页，此外还是一款跨平台多端通用的小书签。

✨<a href="http://www.gxlib.org.cn">广西壮族自治区图书馆</a>  ✨<a href="http://rdbk1.ynlib.cn:6251">中国人民大学复印周刊</a> ✨<a href="https://www.jyxxh.cn">教育信息化</a>
✨<a href="https://clibrary.top">Z库拷贝版Clib</a> ✨<a href="https://forum.freemdict.com">freemdict词典论坛</a> 

🔖 <a href="https://www.ncpssd.org">国家哲学社会科学文献中心</a> 🔖 <a href="https://data.stats.gov.cn/easyquery.htm?cn=C01">国家统计局</a> 🔖 <a href="https://www.gsxt.gov.cn/index.html">国家企业信用信息公示系统</a> 

🔎 <a href="https://wantquotes.net">据意查句</a>  🔎 <a href="https://res.wokanxing.info/jpgramma/index.html">日语文法</a>  🔎 <a href="https://so-zou.jp/web-app/text/proofreading/#word0">文法检查</a> 🔎 <a href="https://kousei.club/校正・校閲で使う記号・符号［基本的な約物の意/#:~:text=約物一覧［基本的な記号・符号の意味と使い方］%201%201%EF%BC%8Eくぎり符%20文章・語句の区切りを明らかにするもの%E3%80%82%20ex%EF%BC%8E句読点・コンマ・ピリオドなど%202%202%EF%BC%8Eくくり符%20文章・語句の前後をくくるもの%E3%80%82,感嘆符・疑問符など%20記号と符号の違い%20「記号」は広く、言語・文字・各種のしるし・身振りなどを含む%E3%80%82%20「文」は漢字であると同時に、地図では学校を示す記号である%E3%80%82%20「符号」は、文字を除き、図形・音声・光・電波などのしるしについて使うことが多い%E3%80%82%20記号と符号の相違にはあいまいな面もある%E3%80%82%20目印として付けた〇は符号だが、地図上の〇は記号である%E3%80%82%20">约物假名表</a> 🔎 <a href="http://www.kawa.net/works/ajax/romanize/japanese.html">汉字罗马注音</a>　🔎 <a href="https://soukaapp.com/dict/">日语词典</a>



## All on One，加速的合集。

<details><summary>GitHub/Source Mirror/Hosts/Booster/Proxy/VPN</summary>

* [DownGit，Github库文件下载](https://minhaskamal.github.io/DownGit/#/home)
* [ghproxy GitHub软件下载](https://ghproxy.com)
* [Thanks-Mirror，各类包镜像源加速](https://github.com/eryajf/Thanks-Mirror)
* [ineo6/hosts，GitHub相关访问加速](https://github.com/ineo6/hosts)
* [dnscrypt-proxy，预防DNS污染与解毒](https://github.com/DNSCrypt/dnscrypt-proxy)
* [ineo6/hosts，GitHub相关访问加速](https://github.com/ineo6/hosts)
* [Watt Toolkit，Steam等游戏平台访问加速](https://steampp.net)
* [glados，访问不可达的404搜索等](https://github.com/glados-network/)
* [protonvpn，VPN和代理还是有些差别的](https://protonvpn.com)

</details>

<details><summary>自己写的开源小书以及曾与网友一起提交的项目</summary>

* [fq-book，原《这本书能让你连接互联网》](https://github.com/hoochanlon/fq-book)
* [w3-goto-world，知识网页收纳库](https://github.com/hoochanlon/w3-goto-world)
* [the0demiurge/ShadowSocksShare，自行搬砖折腾](https://github.com/the0demiurge/ShadowSocksShare)

</details>

## Free or Pay，好用的软件表单。

<details><summary>Mac & Windows</summary>

* [Awesome-Mac](https://github.com/jaywcjlove/awesome-mac)
* [Awesome-Windows](https://github.com/Awesome-Windows/Awesome)、[jnv/lists](https://github.com/jnv/lists)(Pull Request)


校园组织、国有及大型企业也都会正版的批量授权。软件正版化一般仅内部使用。

<!--

http://software.jsnu.edu.cn 江苏师范大学正版软件服务平台

-->

</details>


## Shell for Mac，当初只为更简单...

<details><summary>终端小技巧与vim日常操作</summary>

#### 技巧

1. 在终端“窗口”选项，选择拼贴为窗口组，类似浏览器的新标签页。
2. 终端app：[warp](https://www.warp.dev)、[tabby](https://tabby.sh)。
3. sudo -S`之后的`sudo`不再输密码，终端挂载不休眠`caffeinate`
4. 将gitHub.com换成github.dev，关闭窗口也不怕文本丢失，vscode提交就行。
5. 完全是终端界面才用vim，平时将code作为默认编辑实际上够了。

#### vim日常操作

```
* 模糊搜索、搜索、跳行
* 复制、粘贴
* 定位删除、修改固定单词。
* 剪切
* 定位关标到某个位置
```
</details>

<details><summary>个人常用的shell for Mac </summary>

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
![ ](https://raw.githubusercontent.com/hoochanlon/hoochanlon/master/assets/github-contribution-grid-snake.svg)
-->

<div align="center">

---

 <i><a href="https://hoochanlon.github.io/hoochanlon">About me</a></i>

</div>
