import type { IconifyAppOption, MountIconifyOption } from "./type";
import express from "express";
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
import { getIconCache } from "./cache";

const getIcon = async (
  icon: {
    iconSet: string;
    iconName: string;
    query: Record<string, string>;
  },
  option?: Pick<IconifyAppOption, "cache" | "cacheMaxSize">
): Promise<{ html: string; lastModified: number } | null> => {
  const { iconSet, iconName, query } = icon;
  const { cache, cacheMaxSize } = option || {};
  const iconCache = getIconCache({ cacheMaxSize });

  let cacheKey = "";
  if (cache) {
    cacheKey = `${iconSet}-${iconName}:${Object.entries(query)
      .map(([key, value]) => `${key}:${value}`)
      .join(",")}`;

    if (iconCache.has(cacheKey))
      return Promise.resolve(iconCache.get(cacheKey)!);
  }

  return lookupCollection(iconSet)
    .then((data) => {
      const iconData = getIconData(data, iconName);

      if (!iconData) return null;

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

      const res = {
        html,
        lastModified: data.lastModified ? data.lastModified * 1000 : Date.now(),
      };
      if (cache && cacheKey) iconCache.set(cacheKey, res);

      return res;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};

export const createIconifyApp = (
  option?: IconifyAppOption
): express.Express => {
  const iconify = express();

  iconify.get("/:iconSet/:iconName", (req, res) => {
    const { iconSet, iconName } = req.params;
    const query = (req.query || {}) as Record<string, string>;
    const {
      download = false,
      enableLastModified = true,
      enableCORS = false,
    } = option || {};

    getIcon({ iconSet, iconName, query })
      .then((icon) => {
        if (!icon) return Promise.reject();

        const { html, lastModified } = icon;

        if (query.download ?? download) {
          res.header(
            "Content-Disposition",
            'attachment; filename="' + iconName + '.svg"'
          );
        }

        if (enableLastModified) {
          res.header("Last-Modified", new Date(lastModified).toUTCString());
        }

        if (enableCORS) {
          res.header("Access-Control-Allow-Origin", "*");
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
  option?: MountIconifyOption
) => {
  const { path = "/iconify", ...rest } = option || {};

  const iconify = createIconifyApp(rest);

  app.use(path, iconify);
};
