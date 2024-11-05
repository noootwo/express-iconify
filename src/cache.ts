import type { IconifyAppOption } from "./type";
import { LRUCache } from "lru-cache";

let iconCache: LRUCache<string, { html: string; lastModified: number }> | null =
  null;
export const getIconCache = (
  option?: Pick<IconifyAppOption, "cacheMaxSize">
) => {
  if (!iconCache) {
    const { cacheMaxSize = 10000 } = option || {};
    iconCache = new LRUCache({ max: cacheMaxSize });
  }

  return iconCache;
};
