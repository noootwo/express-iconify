# Express Iconify 服务器

一个轻量级的 Express.js 服务器，用于提供 Iconify 图标。

[English Doc](README.md) | [中文文档](README_zh.md)

## 概述

这个项目提供了一种简单高效的方式来使用 Express.js 提供 Iconify 图标。它使您可以轻松地将 Iconify 图标集成到您的 Web 应用程序中。

## 特点

- 以 SVG 文件的形式提供 Iconify 图标
- 支持自定义图标大小和颜色
- 缓存机制来提高性能
- 兼容 Express.js 4.x

## 安装

要安装项目，请运行以下命令：

```bash
npm install
```

## 使用

要启动服务器，请运行以下命令：

```bash
npm build
npm start
```

服务器默认监听端口 80。如果您想更改端口，可以设置 `PORT` 环境变量。

## API

服务器提供一个单独的 API 端点来提供图标：

```http
GET /:iconSet/:iconName
```

- `iconSet`: Iconify 图标集的名称（例如 "mdi"）
- `iconName`: 图标的名称（例如 "account"）

您还可以指定额外的查询参数来自定义图标：

- `width`: 图标的宽度（例如 "24"）
- `height`: 图标的高度（例如 "24"）
- `color`: 图标的颜色（例如 "#333"）

示例：

```http
GET /mdi/account?width=24&height=24&color=%23333
```

## 许可证

这个项目是根据 MIT 许可证发布的。
