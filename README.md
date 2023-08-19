# React-Admin 🚀

## 介绍 📖

🚀🚀🚀 React Admin，基于 React18、React-Router v6、React-Hooks、Redux && Redux-Toolkit、TypeScript、Vite、Ant-Design 的一套后台管理框架。

## 🔨🔨🔨 项目功能

- 🚀 采用最新技术找开发：React18、React-Router v6、React-Hooks、TypeScript、Vite
- 🚀 整个项目集成了 TypeScript （完全是为了想学习 🤣）
- 🚀 使用 redux 做状态管理，集成 @reduxjs/tookit、react-redux、redux-persist 开发
- 🚀 使用 TypeScript 对 Axios 二次封装 （错误拦截、常用请求封装、全局请求 Loading）
- 🚀 使用 自定义组件 进行路由权限拦截
- 🚀 支持 React-Router v6 路由懒加载配置、菜单手风琴模式、多标签页
- 🚀 使用 Prettier 统一格式化代码，集成 Eslint、Stylelint 代码校验规范（项目规范配置）
- 🚀 使用 husky、lint-staged、commitlint、commitizen、cz-git 规范提交信息（项目规范配置）

## 文件资源目录 📚

```text
React-Admin
├─ .vscode                # vscode推荐配置
├─ public                 # 静态资源文件（忽略打包）
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ config              # 全局配置项
│  ├─ hooks               # 常用 Hooks
│  ├─ layout              # 框架布局
│  ├─ router              # 路由管理
│  ├─ redux               # redux store
│  ├─ styles              # 全局样式
│  ├─ types               # 全局 ts 声明
│  ├─ utils               # 工具库
│  ├─ views               # 项目所有页面
│  ├─ App.tsx             # 入口页面
│  ├─ main.tsx            # 入口文件
│  └─ env.d.ts            # vite 声明文件
├─ .editorconfig          # 编辑器配置（格式化）
├─ .env.development       # 开发环境配置
├─ .env.production        # 生产环境配置
├─ .eslintignore          # 忽略 Eslint 校验
├─ .eslintrc              # Eslint 校验配置
├─ .gitignore             # git 提交忽略
├─ .prettierignore        # 忽略 prettier 格式化
├─ .prettierrc.js         # prettier 配置
├─ .stylelintrc.js        # stylelint 样式格式化配置
├─ commitlint.config.js   # git 提交规范配置
├─ index.html             # 入口 html
├─ pnpm-lock.yaml         # 依赖包包版本锁
├─ package.json           # 依赖包管理
├─ postcss.config.js      # postcss 配置
├─ tailwind.config.js     # tailwind 配置
├─ README.md              # README 介绍
├─ tsconfig.json          # typescript 全局配置
├─ tsconfig.node.json     # typescript 配置
└─ vite.config.ts         # vite 配置
```
