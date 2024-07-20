export interface AppEntryOptions {
  title?: string;
  head?: HeadEntryOptions;
  bodyAttrs?: Record<string, string>;
  script?: Record<string, string>[];
}

export interface HeadEntryOptions {
  meta?: Record<string, string>[];
  link?: Record<string, string>[];
  style?: Record<string, string>[];
  script?: Record<string, string>[];
  noscript?: Record<string, string>[];
}
