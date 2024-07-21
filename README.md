# My site

This is the source code to my website, containing its core contents.

The site is a Deno native application hosted on [**Deno Deploy**]().

To get it running:
```bash
git clone https://github.com/nikeokoronkwo/website.git site
cd site
deno task dev
```

Production builds can be run with similar commands using `deno task build` (build only) or `deno task prod` (build and serve).
