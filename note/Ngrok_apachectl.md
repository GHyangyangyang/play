

**写在前面**：在做移动端项目的时候，需要通过手机来访问电脑上本地的项目，同上让不在同一个局域网的其他设备也可以访问，来同时调试项目，下面这两个就派上了用场！

<!-- more -->

---
### Ngrok

```
Ngrok的使用相对简单，我使用的是 Sunny-Ngrok 

使用方法：

	1. 去官网注册一个账号，开通一条免费的隧道
	2. 根据官网的教程填写相应的东西
	3. 下载安装Sunny
	4. 需要注意的是，映射的端口号默认的是80 个人建议进行修改。例如：8080、8081.
	
启动：

	注意，启动隧道需要 cd 到安装的ngrok的目录下
	启动隧道
	./sunny clientid 隧道id
	
	启动多个隧道
	./sunny clientid c7fb2defb4081919,3e23d14f040b2b12
```

### Mac apache

```
1. 基本操作

	MAC自带了apache，所有可以直接用
	httpd -v #查看Apache版本信息
	sudo apachectl start #启动
	sudo apachectl stop #停止
	sudo apachectl restart #重启

注意：每次修改完东西，都需要重新启动apache
Apache 就启动成功，站点的根目录为系统级根目录 /Library/WebServer/Documents

2. 创建用户级根目录（管理起来更加方便）
	1. 创建一个文件夹Sites
	2. 查看etc/apache2/users 下是否有 username.conf文件，username就是你的用户名，比如我的就       	   是yangyangyang.conf！如果没有就创建一个
	（ps: 我第一次就创建成了username.conf文件！尴尬，现在都没改过来，懒的改了）
	
	3. 创建完成后打开，把下面的配置信息扔进去
	
		 <Directory "/Users/yangyangyang注意这里是你的用户名/Sites/">
		     Options Indexes MultiViews FollowSymLinks
		     AllowOverride All
		     Order allow,deny
		     Allow from all
		     Require all granted
		 </Directory>
		
	4. 编辑 /etc/apache2/httpd.conf 文件，找到下列代码，并将前面的注释符号 # 删除：

	     Include /private/etc/apache2/extra/httpd-userdir.conf
	     LoadModule userdir_module libexec/apache2/mod_userdir.so
	     
	5. 编辑 /etc/apache2/extra/httpd-userdir.conf 文件，找到下列代码，并将前面的注释符号 # 删除：
	
      Include /private/etc/apache2/users/*.conf 

3. 重启 Apache 
	在浏览器中输入 http://127.0.0.1/~username 或 http://localhost/~username，即可测试用户目录是否工作。



```
### /etc/apache2/httpd.conf文件的一些参数

```
上面完成后，启动Apache，然后打开Ngrok,输入Ngrok上面产生的网址，查看是否会跳转到你修改的根目录下，如果没有，只需要修改下面的DocumentRoot 后面改成你指定网站的根目录就可以了！ 

<VirtualHost *:80>
         DocumentRoot "/path" #这里指定你的网站根目录 
         ServerName example.com
         ErrorLog "/private/var/log/apache2/sites-error_log"
         CustomLog "/private/var/log/apache2/sites-access_log" common
         <Directory />
                 Options Indexes FollowSymLinks MultiViews
                 AllowOverride All
                 #Order deny,allow
                 #Allow from all
                 Require all granted
         </Directory>
</VirtualHost>
```	







