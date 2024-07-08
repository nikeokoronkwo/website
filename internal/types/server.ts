export interface ClientRequest {
  path: string;
  hash: string;
  params: {
    [k: string]: string | string[];
  };
  query: Record<string, any>;
  fullPath: string;
  meta: any;
}
