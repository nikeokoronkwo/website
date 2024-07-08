import { ClientRequest } from "./server.ts";
import { ClientRoute } from "../lib/client.ts";

export interface ClientModule {
  default: ClientRoute;
}

export interface ServerModule {
  default: (req: Request) => PromiseLike<Response>;
}
