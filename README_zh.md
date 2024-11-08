# Express Iconify 服务器

一个轻量级的 Express.js 服务器，用于提供 Iconify 图标服务。

[English Doc](README.md) | [中文文档](README_zh.md)

## 概述

该项目提供了一种简单且高效的方式，使用 Express.js 来提供 Iconify 图标服务。它允许您轻松地将 Iconify 图标集成到您的 web 应用程序中。

## 用法

### 1. 与外部 Express 项目集成

安装 `express-iconify`，运行以下命令：

```bash
# npm
npm install express-iconify

# yarn
yarn add express-iconify

# pnpm
pnpm add express-iconify
```

您可以将 Iconify 服务器导入到外部的 Express 项目中，并使用 `mountIconify` 函数进行挂载。

#### mountIconify

`mountIconify` 是一个将 Iconify 服务器挂载到您的 Express 应用程序的函数。它接受两个参数：

- `app`: 一个 Express 应用实例。
- `option`: 一个可选的配置对象，用于配置 `mountIconify` 的行为。

##### 配置选项

- `path`: 挂载 Iconify 服务器的路径，默认为 `/iconify`。
- `cache`: 是否将图标数据缓存在内存中。默认为 `true`。
- `cacheMaxSize`: 缓存的最大容量。默认为 `10000`。
- `enableLastModified`: 是否设置 `Last-Modified` 响应头。默认为 `true`。
- `enableCORS`: 是否启用 CORS（跨域资源共享）。默认为 `false`。
- `download`: 是否将图标作为附件下载。默认为 `false`。

##### 返回值

`mountIconify` 函数返回一个挂载了 Iconify 服务器的 Express 应用实例。

##### 示例

```javascript
import express from "express";
import { mountIconify } from "express-iconify";

const app = express();

// 将 Iconify 服务器挂载到 /icons 路径上
mountIconify(app, { path: "/icons" });

app.listen(3000, () => {
  console.log("服务器已启动，端口号为 3000");
});
```

在这个示例中，Iconify 服务器将会挂载到 `/icons` 路径。

### 2. 独立服务器

首先安装依赖，运行以下命令：

```bash
npm install
```

要构建并启动服务器，请运行以下命令：

```bash
npm build
npm start
```

服务器将默认监听 80 端口。您可以通过设置 `PORT` 环境变量来更改端口。

## API 端点

该服务器提供了一个用于提供图标的 API 端点：

```http
GET /:iconSet/:iconName
```

- `iconSet`: Iconify 图标集的名称（例如 "mdi"）
- `iconName`: 图标的名称（例如 "account"）

您还可以通过指定附加的查询参数来自定义图标：

- `width`: 图标的宽度（例如 "24"）
- `height`: 图标的高度（例如 "24"）
- `color`: 图标的颜色（例如 "#333"）
- `rotate`: 图标的旋转角度（例如 "90deg"）
- `flip`: 图标的翻转方向（例如 "horizontal"）
- `box`: 是否为图标添加边框（例如 "true"）
- `download`: 是否将图标作为附件下载（例如 "true"）

示例：

```http
GET /:iconSet/:iconName?width=24&height=24&color=%23333&rotate=90deg
```

这将会检索一个宽度和高度为 24 像素、颜色为 `#333`，并旋转了 90 度的图标。

## 许可证

该项目基于 MIT 许可证授权。
