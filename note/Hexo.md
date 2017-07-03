#Hexo

> 安装

	安装Hexo需要Node.js和gie，有这两个之后直接用命令行安装Hexo
	
	sudo npm install -g hexo
	
> 初始化

	创建一个文件夹 在命令行中将目录定位在该文件夹中，输入下面的命令,ps:注意啊，目录一定搞清楚，也就是你命令行前面显示的文件夹：
	
	hexo init //初始化
	npm install
	
> 生成静态页面

	还是在该目录下执行命令：
	
	sudo generate // 可以简写为 hexo g
	
	安装hexo-server插件：
	
	sudo npm install hexo-server
	
	本地启动：
	
	hexo server //可简写为 hexo s
	
	然后就是见证奇迹的时刻，在浏览器中输入 http://localhost:4000/ 。就可以看到啦！激动...但是.....到这里你的博客还只能自己看到。别人看不到啊，怎么办？？？ 接着往下看...
	
> 配置Github 

	因为我是先研究的Github再研究的Hexo,所有Github早已经配置好啦，大概是这样的
	
		1.	新建一个仓库 这里要注意的是 新建仓库的名字必须是 你的用户名.github.io 
		2. 在刚才安装Hexo的文件夹下找到_config.yml文件，我们要对他进行修改了。ps:马上就可以让别人看到你的博客啦！
		3. 用编辑器打开这个文件 拉到最下面进行修改(注意啊，每个冒号后面都有一个空格，别踩坑！)
		deploy:
		   type: git
  		   repository: 这里填写你的Github仓库地址 ps:去你Github那里直接复制过来
  			branch: master
  			ps:文件的其他参数，我后面有写，先不要急！
  		4.	执行： 
  		npm install hexo-deployer-git --save
  		5. 执行部署 ps:就跟项目上线差不多，执行了别人就能看到了，想好有没有BUG啊
  		hexo deploy
  		
  	大功告成！ 接下来就是见证奇迹时刻，在浏览器中输入 刚才你的仓库名 就是那个 你的用户名.github.io

> 总结一下：
	
	每次对主题、文件等就行了修改，需要三步才能让你的博客让别人看到
		1.	hexo clean 
		2. hexo generate
		3. hexo deploy
	
	要是感觉单词长 就这样写：
		1.	hexo clean //可以简写为 hexo c
		2. hexo g -d
	
	突然想起来，每次发布完，你会发现终端不能输入命令了！ps:反正我的是这样的，按control+z 

> 备注：
	
	一些常用的命令：
		hexo new "postName" #新建文章
		hexo new page "pageName" #新建页面
		hexo generate #生成静态页面至public目录
		hexo server #开启预览访问端口 ps:默认端口4000，'ctrl + c'关闭server
		hexo deploy #将.deploy目录部署到GitHub
		hexo help  #查看帮助
		hexo version  #查看Hexo的版本
		
	创建的文章，在source/_posts下，后缀是md，哦对了！这里面那个Hello什么什么.md那个文件可以删了，看到就想起来当初看java的时候，配置完环境，第一条输入的hello world！！
		
> _config.yml 文件的一些参数说明

	title 网站的标题
	subtitle 网站的副标题
	description 网站的描述
	author 你的名字
	language 网站的语言。使用2-lettter ISO-639-1代码。默认是en。ps: 有填写规范的，别乱写）
	timezone 网站的时区。Hexo默认使用计算机上的设置。你可以在这里找到可用的时区列表。一些例子是America/New_York，Japan和UTC。 





