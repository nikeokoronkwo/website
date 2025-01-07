---
name: Grayprint
series: Product Launch
description: A software product designed by Nike Okoronkwo
date: "08/01/2025"
---

# Grayprint

Many of us have some idea, or maybe it's just some application your boss might've told you to build for x-y-z. Whatever, the case may be, before making an application we need to start somewhere.

Thankfully, most web frameworks have made this easier by scaffolding parts of the application for us. This is the purpose of tools like `create-vite` or `nuxi init` and more. The problem is that people don't _just_ use a web framework: they also use tools and libraries, like ESLint, Prettier, TailwindCSS, ShadCN, and a lot more. Some come with their own scaffolding tool, while some need to be manually set up. People often get stuck trying to make use of these tools or configuring them to be used with their specific framework.

And even with all these tools, most of us still find it hard to go from a blank slate to a painting, or at least an outline. That's why people make use of **templates**, which are basically starting points for applications, which contain not only a given framework integrated with tools that you may need for making the application you're looking for.

Most times the templates are there, but then the experience of using one can be better. The experience of making the template "your own" can be much better, that way you don't have to spend time finding out how to properly change all occurrences of "Your name here" or "Your logo" one after the other.

They may not seem like big issues but brought together, these are issues nonetheless, and they are issues that can hurt initial productivity, or just get one frustrated trying to build and start a "Hello World".

## The Solution
What if there was a way to save time that could have been put into doing all these things, and just skip to the _good part_: The part where you focus on your application, and not on the tools you need to make it?
What if there was a way to not just get started with extremely good templates, but also configure them to your liking by choosing the options you want, with your style?

Whether it is a SaaS Starter for users to start making their own SaaS website, or a starter scaffolder following the best design principles and libraries needed internally for websites your company makes, being able to get started quickly with any project is important, and it saves valuable time.

::display
This is where [Grayprint](/projects/grayprint) comes in! Grayprint is the only CLI tool you'll need to help access a variety of templates and get started with your dream application quickly and easily. Now you can focus on debugging your app, rather than debugging some ESLint integration.

Making use of Grayprint is as easy as running `grayprint` on the terminal, and you are met with our core scaffolder. Want to make use of a template? Pass the `--template` flag to reference templates from Github, NPM, JSR, or even from your system. 

Adopting grayprint is even easier. If you have a current template, all you need to do is run the `--unpack` comand and it will just "copy and paste" the template into your codebase.

#right
```diff
- npm create vite@latest -- --template vue my-project
- cd my-project
- touch .prettierrc .prettierignore
- echo "{}" >> .prettierrc
- # more and more commands
- npm install
+ npx grayprint my-project
```

::

Want to make your own template? Use the [`@grayprint/create`](https://jsr.io/@grayprint/create) package to make a template that can be used by hundreds of users wanting to get started on your project.

## What makes it special?
If you plan on making applications and need somewhere to get started, Grayprint can help you access templates from various sources like Github, NPM, and JSR. Grayprint comes with a core scaffolder that can help you get started with your project as fast as possible. It acts as a wrapper for many `create-` scripts to allow for speeding up the scaffolding process and integrations of such with your favorite tools.

If you plan on making such templates and are looking for a way to distribute these templates for others to use, Grayprint also makes that easy.
- Powerful Toolset: Grayprint comes with a large suite of tools that can help to scaffold projects programmatically, as well as integrations for popular tools and packages like Tailwind, [Prettier](https://prettier.io) and [ESLint](https://eslint.org/). Can't find the one you want? 
- Programmatic by design: Grayprint allows you to not only make a static template that one can just "copy and paste" into their codebase (usually alongside some instructions), but it allows you to easily scaffold the application with user inputs, therefore being able to skip the boring parts of following certain guidelines that may/may not work for everyone, but also allow you to make templates for users just getting started according to their liking and style

### _What if I want to make money off of my template?_ 
Not to worry, as plans for a marketplace are in development, where you can host and display your templates for others to use and purchase, just by running `grayprint` from the terminal (with support for integrating with hosting providers, so if you already have a template on a private Github Repository, it doesn't even need to leave). 

In the meantime, you can [indicate interest](/forms?title=Grayprint%20Marketplace&url=https://docs.google.com/forms/d/e/1FAIpQLScYvKoipuonyFqOh_F06kbuYoOQKbPm9498iaQUTuevbNKfrg/viewform?embedded=true).

## How do I get started?
Grayprint is available on [Github](https://github.com/nikeokoronkwo/grayprint): You can [check out the documentation](https://github.com/nikeokoronkwo/grayprint/docs) and get started, follow progress on Grayprint's development, and even try it out for yourself. 

At the moment, I plan on having a set of "built-in" templates that will be fully supported by default on grayprint (via the `--template` flag and the name of the built in). These built-in templates are to span a large number of frameworks and/or tools for the needed use case. If you have suggestions, ideas or anything of value, feel free to make a contribution with your proposed idea and I would love to see what you have to share!

If you have any feedback or issues, feel free to contact, or [drop an issue](https://github.com/nikeokoronkwo/grayprint/issues).