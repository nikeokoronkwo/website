# Grayprint
> Read the blog post about Grayprint [here](/blog/grayprint)!

Grayprint is a command-line tool that makes it easier to setup your projects
with ease. By simply running the command-line tool, you can scaffold any kind of
project you want!

Grayprint makes it possible to easily make and share project templates for
people to use, with support for authentication, user-provided information, .env
files, and more!

## Getting Started

To begin using grayprint, you will need to install it.

While the packages used for developing grayprint are platform-agnostic (and
available via JSR), the CLI itself uses Deno-specific APIs and so is available
in

### Deno

The grayprint CLI is available via `deno.land/x`

```bash
deno install -A deno.land/x/grayprint/main.ts -n grayprint
```

### Node/Bun

The grayprint CLI has been built for Node and is available as an NPM package
that can be installed globally

```bash
npm install -g grayprint # npm
pnpm add -g grayprint # pnpm
yarn global add grayprint # yarn
bun add -g grayprint # bun
```
