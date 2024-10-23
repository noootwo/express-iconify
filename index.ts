import express from "express";

import { mountIconify } from "./iconify";

const app = express();
app.use(express.urlencoded({ extended: false }));

mountIconify(app);

const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log("启动成功", port);
});
