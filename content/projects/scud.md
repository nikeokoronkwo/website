---
name: Scud
---

# Scud

Scud is a meta build system for generating makefiles for building

Scud takes in configuration as a `GEN.yaml` file in the root of your project, and creates makefiles for building multiple packages in a single project, with support for C/C++, D, Swift, Go, Rust and Zig.

Scud is designed to help projects planning on integrating new languages like Rust into their codebase easily, but can also help codebases using a single language as well. Scud comes with modern tooling for handling large multi-package and single-package projects with dependency graphing and analysis, generators and more all from an easy-to-use dashboard.

## Upcoming Features

These are upcoming features currently worked on, and contributions would be wanted.

- [ ] Completing the backend of the tool
- [ ] Writing the YAML frontend of the tool, as well as YAML config
- [ ] Creating our own scud configuration file and frontend
