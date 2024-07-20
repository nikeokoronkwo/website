export interface APIRequest {
  req: Request;
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
}


export interface APIRoute {
    (req: Request): PromiseLike<Response>;
}

export function defineRoute(options: APIRoute) {

}