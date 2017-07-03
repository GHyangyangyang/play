# git

> 创建、添加、提交

	git init  //创建版本库，需要注意的是，将目录切换你希望的文件夹里面进行创建
	
	git add */文件名 // 后面写需要添加的文件名，*代表所有的
	
	git commit -m "提交说明" //把添加的文件提交到仓库 （这个就相当于玩游戏时候存档功能）
	总结：当文件假被创建仓库初始化之后，该文件夹就是一个工作区，而在其中会多出一个.git文件夹 他是git的版本库，在git的版本库中，有着非常重要的 暂存区（index）,还有git会为我们自动创建的一个分支master,以及指向master的一个指针HEAD。放我们 git add 的时候，就是相当于把文件修改添加到了暂存区，然后 git commit 就是把暂存区的内容提交到了当前的分支。
	
> 时光穿梭（查看、管理修改、撤销修改）

	git status //查看仓库的当前状态 （查看哪些文件被修改过）
	
	git diff //查看还没有暂存的文件更新了哪些部分  （查看文件被修改了哪些内容）
	
	git log //查看历史提交记录 如果嫌输出的信息太多，可以加上参数 --pretty=oneline
	
	git reset --hard commit_id //版本退回
		1. 在版本退回前，可以先 git log 查看版本的历史，以便确定要退回到哪个版本
		2. 要重返未来，用 git reflog 查看命令历史，找到要回到未来的哪个版本

	git checkout -- fileName //把文件在工作区的修改全部撤销，有两种情况：
		1. 修改后还没有add到暂存区，那么撤销后回到了和版本库一模一样的状态
		2. 已经add到了暂存区，撤销修改回到添加到暂存区后的状态。
		总结：就是让文件回到最近一次git commit 或者 git add时的状态。
		git checkout其实是用版本库里的版本替换工作区的版本，无论工作区是修改还是删除，都可以“一键还原”。
		
	git reset HEAD filename //可以撤销暂存区的修改，重新放回工作区。
	
		撤销修改应用场景：
			场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令git checkout -- file。
			场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令git reset HEAD file，就回到了场景1，第二步按场景1操作。
			场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。
			
		git rm //删除版本库中的文件
		
		
> 远程仓库
	
	1.	添加远程仓库
	
		第1步：创建SSH Key 
			ssh-keygen -t rsa -C "GitHub注册时候的邮箱"
			
		第2步：在本地仓库的目录下关联远程仓库
			git remote add origin git@github.com:github上的用户名/仓库名.git
			
		第3步：把本地仓库的所有内容推送到远程仓库上
			git push -u origin master //第一次推送时候加上-u 后面再推送就不用了 Git会把我们本地的master分支和远程仓库上的分支关联起来
			
	2.	克隆远程仓库 
	
		git clone git@github.com:用户名/仓库名.git 

	  




