export interface RedirectObject {
  name?: string;
  id: string;
  url: string;
  email?: boolean;
}

export const links: RedirectObject[] = [
  { name: "Github", id: "github", url: "https://github.com/nikeokoronkwo" },
  { name: "Patreon", id: "patreon", url: "https://patreon.com/nikechukwu" },
  { name: "Email", id: "email", url: "nikechukwu@gmail.com", email: true }
];
