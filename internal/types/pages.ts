import { ClientRoute } from "../lib/client.ts";
import { APIRequest } from "~/internal/lib/api.ts";

export interface ClientModule {
  default: ClientRoute;
}

export interface ServerModule {
  default: (req: APIRequest) => Promise<Response> | Response;
}
