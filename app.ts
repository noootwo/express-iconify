import { createIconifyApp } from "./iconify";

const app = createIconifyApp();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Iconify server started on port ", port);
});
