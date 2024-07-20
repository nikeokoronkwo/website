import { AppEntryOptions } from "../types/templates.ts"

export interface ClientRequest {
  /** The path of the given route */
  path: string;
  /**
   * The hash passed to the route
   * @default ""
   */
  hash: string;
  /**
   * Any dynamic parameters passed from the route
   * @default {}
   */
  params: {
    [k: string]: string | string[];
  };
  /**
   * Query parameters passed to the route, as a Record
   * @default {}
   */
  query: Record<string, any>;
  /**
   * The full path including the query and hash
   * @default ClientRequest.path
   */
  fullPath: string;
  /**
   * Any metadata passed
   * @unused
   */
  meta?: any;
}

/** @todo migrate options here away and make interface a function interface */
export interface ClientRoute {
  /** Page Metadata Configuration */
  pageMeta?: AppEntryOptions;
  /** The function handler for the route, used to render the page */
  handler: (req: ClientRequest) => any;
  /** The styles to apply for that page (scoped) @default undefined */
  style?: string;
  /** Whether to override global styles @default false */
  overrideGlobal?: boolean;
}

/**
 * Type function to provide typing for client route options
 * @param options
 * @returns
 */
export function definePage(options: ClientRoute) {
  return options;
}
