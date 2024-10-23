# Express Iconify Server

A lightweight Express.js server for serving Iconify icons.

[English Doc](README.md) | [中文文档](README_zh.md)

## Overview

This project provides a simple and efficient way to serve Iconify icons using Express.js. It allows you to easily integrate Iconify icons into your web applications.

## Features

- Serve Iconify icons as SVG files
- Support for custom icon sizes and colors
- Caching mechanism to improve performance
- Compatible with Express.js 4.x

## Installation

To install the project, run the following command:

```bash
npm install
```

## Usage

To build and start the server, run the following command:

```bash
npm build
npm start
```

The server will listen on port 80 by default. You can change the port by setting the `PORT` environment variable.

## API

The server provides a single API endpoint for serving icons:

```http
GET /:iconSet/:iconName
```

- `iconSet`: The name of the Iconify icon set (e.g. "mdi")
- `iconName`: The name of the icon (e.g. "account")

You can also specify additional query parameters to customize the icon:

- `width`: The width of the icon (e.g. "24")
- `height`: The height of the icon (e.g. "24")
- `color`: The color of the icon (e.g. "#333")

Example:

```http
GET /mdi/account?width=24&height=24&color=%23333
```

## License

This project is licensed under the MIT License.
