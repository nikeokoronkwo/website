import p from "~/assets/json/projects.json" with { type: "json" };
import a from "~/assets/json/apps.json" with { type: "json" };

export interface RedirectObject {
  name?: string;
  id: string;
  url: string;
  email?: boolean;
}

export const links: RedirectObject[] = [
  { name: "Github", id: "github", url: "https://github.com/nikeokoronkwo" },
  { name: "Patreon", id: "patreon", url: "https://patreon.com/nikechukwu" },
  { name: "Email", id: "email", url: "nikechukwu@gmail.com", email: true },
];

interface BaseProject {
  name: string;
  description?: string;
  img?: string;
  route?: string;
  inProgress?: boolean;
  directs?: RedirectObject[];
}

export interface Project extends BaseProject {
  languages: string[];
}

export const projects: Project[] = p;

export interface Application extends BaseProject {
  platforms: string[];
}

export const apps: Application[] = a;