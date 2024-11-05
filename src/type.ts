export interface IconifyAppOption {
  /** Whether to cache the icon data in the memory, default is `true` */
  cache?: boolean;
  /** The maximum size of the cache, default is `10000` */
  cacheMaxSize?: number;

  /** Whether to set the `Last-Modified` header, default is `true` */
  enableLastModified?: boolean;

  /** Whether to enable CORS, default is `false` */
  enableCORS?: boolean;

  /** Whether to serve the icon as attachment, default is `false` */
  download?: boolean;
}

export interface MountIconifyOption extends IconifyAppOption {
  /** The path to mount the iconify app, default is `/iconify` */
  path?: string;
}
