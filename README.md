# 介绍
这是？赛尔号精灵图鉴

为什么？赛尔号游戏里面的精灵图鉴太难用了，所以想自己搞一个

数据从哪儿来？[网站](https://news.4399.com/seer/jinglingdaquan/)上有全量的精灵数据，可以直接下载

# 预览

预览地址：https://2sky2night.github.io/seer-pets/

功能：
- [x] id排序
- [x] 关键词搜索
- [ ] 属性检索
- [ ] 精灵详情页

截图：

![image](https://github.com/user-attachments/assets/7140366d-6fb8-4871-8848-060b77ac1b8c)


# 任务1：获取精灵数据

代码位置：task-get-pets

最终目标：写一段脚本，可以输出所有精灵的json文件

实现步骤:

1. 下载目标网站文件（精灵全量数据都在html里面）
2. 解析html文件，提取精灵数据（难点）
3. 输出json文件

## 1. 下载目标网站文件

通过request请求到网站数据

## 2. 解析html文件，提取精灵数据

1. 通过JSDOM模拟浏览器解析html，找到对应存放全量精灵数据的script标签。
2. 通过vm.createContext(sandbox);创造沙箱环境，将script标签里的代码在沙箱环境中运行
3. 通过沙箱环境，拿到执行代码时声明的精灵数据。（正则也行）

## 3. 输出json文件

格式化数据，并最终输出精灵数据到本地

# 任务2：根据精灵数据搭建简易的精灵图鉴网站

代码位置：seer-pets-website

最终目标：

1. 支持搜索
2. 支持属性检索
3. 支持id排序
4. 分页加载？有意义不

# 任务3：github action部署网站

脚本位置：.github\workflows\run-script-and-deploy.yml

最终目标：

1. 部署前端代码（包含精灵的json文件）
2. github action是否支持定时任务, 定时更新精灵数据
   1. 定时执行任务1中的脚本（？）
   2. 是否能将脚本输出的内容提交到github仓库（？）
   3. 是否能触发github action重新部署网站
