import p from "~/assets/json/projects.json" with { type: "json" };

interface RedirectObject {
  name?: string;
  id: string;
  url: string;
  email?: boolean;
}

const links: RedirectObject[] = [
  { name: "Github", id: "github", url: "https://github.com/nikeokoronkwo" },
  { name: "Patreon", id: "patreon", url: "https://patreon.com/nikechukwu" },
  { name: "Email", id: "email", url: "nikechukwu@gmail.com", email: true },
];

/**
 * Map ids to icons
 */
export const iconMap = new Map([
  // languages
  ["dart", "simple-icons:dart"],
  ["cplusplus", "simple-icons:cplusplus"],
  ["typescript", "akar-icons:typescript"],
  ["deno", "simple-icons:deno"],

  // operating systems
  ["macos", "simple-icons:macos"],
  ["ios", "simple-icons:ios"],
  ["windows", "bi:windows"],
  ["linux", "ant-design:linux-outlined"],
  ["android", "ic:baseline-android"],
  ["embedded", "carbon:chip"]
]);

export interface Project {
  name: string;
  description?: string;
  img?: string;
  route?: string;
  inProgress?: boolean;
  directs?: RedirectObject[];
  languages?: string[];
}

const projects: Project[] = p;

export { links, projects };
export type { RedirectObject };
