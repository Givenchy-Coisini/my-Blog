# my-Blog
Node.js从零开发web server博客项目（原生+express+koa2）
目录 Node.js学习Node.js的真正用途学习nodejs的困惑概述准备阶段使用原生代码开发案例使用框架重构线上环境



Node.js学习

Node.js的真正用途

- nodejs，是一个js的运行环境
- 运行在服务器端，作为web server
- 运行在本地，作为打包，构建工具

学习nodejs的困惑

- nodejs运行在服务端，而非浏览器环境
- 服务端开发的思路和套路，与前端是完全不一样的

概述

- 做什么？ nodejs入门到实战，开发个人博客系统
- 哪些部分？ API、数据存储、登录、日志、安全
- 技术？ http、stream、session、mysql、redis、nginx、pm2....
  -  原生代码开发API、数据存储、登录和redis、安全和日志
  -  使用框架开发 express、koa2、中间件和插件、中间件的原理
  -  线上部署：pm2介绍配置、pm2多线程模型、服务端运维

准备阶段

- nodejs下载安装、nodejs和js的区别
- 服务端的特点、服务端和前端的区别
- 博客项目的需求分析和技术方案设计

使用原生代码开发案例

- 实现API和数据存储，使用mysql数据库
- 从0实现登录，并使用redis存储登录信息
- 安全，日志记录和日志分析

使用框架重构

- 分别使用express、koa2
- 中间件、插件常见机制
- 中间件原理

线上环境

- pm2介绍和配置
- pm2多线程模型
- 关于服务端运维
