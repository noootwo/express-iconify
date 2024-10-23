import express from "express";
import { LRUCache } from "lru-cache";
import { lookupCollection } from "@iconify/json";
import {
  defaultIconCustomisations,
  defaultIconDimensions,
  flipFromString,
  getIconData,
  IconifyIconCustomisations,
  iconToHTML,
  iconToSVG,
  rotateFromString,
} from "@iconify/utils";

const iconCache = new LRUCache<string, string>({
  max: 20000,
});

const genIconHtml = async (
  iconSet: string,
  iconName: string,
  query: Record<string, string>
) => {
  const cacheKey = `${iconSet}-${iconName}:${Object.entries(query)
    .map(([key, value]) => `${key}:${value}`)
    .join(",")}`;

  if (iconCache.has(cacheKey)) {
    return Promise.resolve(iconCache.get(cacheKey) as string);
  }

  return lookupCollection(iconSet)
    .then((data) => {
      const iconData = getIconData(data, iconName);

      if (!iconData) {
        return null;
      }

      // Clean up customisations
      const customisations: IconifyIconCustomisations = {};

      // Dimensions
      customisations.width = query.width || defaultIconCustomisations.width;
      customisations.height = query.height || defaultIconCustomisations.height;

      // Rotation
      customisations.rotate = query.rotate
        ? rotateFromString(query.rotate, 0)
        : 0;

      // Flip
      if (query.flip) {
        flipFromString(customisations, query.flip);
      }

      // Generate SVG
      const svg = iconToSVG(iconData, customisations);

      let body = svg.body;
      if (query.box) {
        // Add bounding box
        body =
          '<rect x="' +
          (data.left || 0) +
          '" y="' +
          (data.top || 0) +
          '" width="' +
          (data.width || defaultIconDimensions.width) +
          '" height="' +
          (data.height || defaultIconDimensions.height) +
          '" fill="rgba(255, 255, 255, 0)" />' +
          body;
      }
      let html = iconToHTML(body, svg.attributes);

      // Change color
      const color = query.color;
      if (
        color &&
        html.indexOf("currentColor") !== -1 &&
        color.indexOf('"') === -1
      ) {
        html = html.split("currentColor").join(color);
      }

      iconCache.set(cacheKey, html);
      return html;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};

export const createIconifyApp = () => {
  const iconify = express();

  iconify.get("/:iconSet/:iconName", (req, res) => {
    const { iconSet, iconName } = req.params;
    const query = (req.query || {}) as Record<string, string>;

    genIconHtml(iconSet, iconName, query)
      .then((html) => {
        // Send SVG, optionally as attachment
        if (query.download) {
          res.header(
            "Content-Disposition",
            'attachment; filename="' + iconName + '.svg"'
          );
        }

        res.type("image/svg+xml; charset=utf-8").send(html);
      })
      .catch((err) => {
        console.error(err);
        res.status(404).send("Icon not found");
      });
  });

  return iconify;
};

export const mountIconify = (
  app: express.Express,
  option?: {
    path?: string;
  }
) => {
  const { path = "/iconify" } = option || {};

  const iconify = createIconifyApp();

  app.use(path, iconify);
};
