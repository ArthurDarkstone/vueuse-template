# vueuse-template

本项目为 vueuse 的模板项目，用于快速启动并创建utils 工具库的项目。基于VueUse 删减了一部分内容，只保留了核心的功能。如有需要请参考VueUse的官方文档。

- [VueVse](https://github.com/vueuse/vueuse)

## 环境依赖

- nodejs v18+
- pnpm - 本项目使用pnpm-workspace 作为monorepo 项目管理工具

## 启动项目

```bash

pnpm i
pnpm run dev

```

## 结构说明

本项目由vueuse 拆分，采用与vueuse 相同的项目结构
- 使用pnpm-workspace 作为monorepo 项目管理工具，对应`pnpm-workspace.yaml` 文件
- vueuse 原项目核心文件夹为 `packages/shared`和`packages/core` ，在本项目中改为 `packages/core` 和 `packages/vue`
- 请使用nodejs v18+
- `packages/metadata` 和 `scripts/` 文件夹下包含项目自动化相关的nodejs脚本，包含d.ts 文件生成、项目元信息、自动构建发布等。

## 发布

发布前需注册npm 账号，地址：[https://www.npmjs.com/signup](https://www.npmjs.com/signup)

注意：本项目使用nodejs 脚本发布，将会至少发布三个npm 包。发布之前先确保npm 没有重名的包，如果有重名情况，建议添加包名前缀后发布，如`@arthur/utils-core`

```bash
npm login   // 登录你的npm账号，根据提示输入用户名，密码和邮箱

npm who am i // 查看npm登陆状态，在标准输出上打印出username

pnpm publish:ci // 发布包，此命令将发布3个包 utils-metadata utils-core utils-vue
```
