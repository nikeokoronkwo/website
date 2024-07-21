import { RedirectObject } from "./links.ts";
import p from "./projects.json" with { type: "json" }

export interface Project {
  name: string;
  // deno-lint-ignore no-explicit-any
  description?: string;
  img?: string;
  route?: string;
  inProgress?: boolean;
  directs?: RedirectObject[];
  languages?: string[];
}


export const projects: Project[] = p;
