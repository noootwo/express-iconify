# Express Iconify Server

A lightweight Express.js server for serving Iconify icons.

[English Doc](README.md) | [中文文档](README_zh.md)

## Overview

This project provides a simple and efficient way to serve Iconify icons using Express.js. It allows you to easily integrate Iconify icons into your web applications.

## Usage

### 1. Integration with External Express Project

Install the `express-iconify`, run the following command:

```bash
# npm
npm install express-iconify

# yarn
yarn add express-iconify

# pnpm
pnpm add express-iconify
```

You can import the Iconify server into your external Express project and mount it using the `mountIconify` function.

#### mountIconify

`mountIconify` is a function that mounts the Iconify server to your Express application. It takes two arguments:

- `app`: An Express application instance.
- `option`: An optional options object that configures the behavior of `mountIconify`.

##### Options

- `path`: The mount point path. Optional, Defaults to `/iconify`.

##### Returns

The `mountIconify` function returns the Express application instance with the Iconify server mounted.

##### Example

```javascript
import express from "express";
import { mountIconify } from "express-iconify";

const app = express();

// Mount Iconify server to /icons path
mountIconify(app, { path: "/icons" });

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
```

In this example, the Iconify server is mounted to the `/icons` path.

### 2. Standalone Server

Install the dependencies first, run the following command:

```bash
npm install
```

To build and start the server, run the following command:

```bash
npm build
npm start
```

The server will listen on port 80 by default. You can change the port by setting the `PORT` environment variable.

## API Endpoints

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
- `rotate`: The rotation of the icon (e.g. "90deg")
- `flip`: The flip direction of the icon (e.g. "horizontal")
- `box`: Whether to add a bounding box around the icon (e.g. "true")
- `download`: Whether to download the icon as an attachment (e.g. "true")

Example:

```http
GET /:iconSet/:iconName?width=24&height=24&color=%23333&rotate=90deg
```

This would retrieve an icon with a width and height of 24 pixels, a color of `#333`, and rotated 90 degrees.

## License

This project is licensed under the MIT License.
