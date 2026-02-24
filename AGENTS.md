# Agent Guidelines

## Philosophy

- Keep code minimal; do not add features, flags, or abstractions unless asked.
- Avoid defensive code and "just in case" checks.
- Let errors bubble up unless there is a clear reason to handle them.

## Aesthetics

- Prefer arrow functions for free functions only; use standard method syntax on classes.

## Imports

- Prefer `@build/*` alias imports over relative paths for build-system modules.

## Naming

- Unless a module is purely organizational, namespace public APIs by parent folder/module (`foo/bar` -> `FooBar`).
- Prefer object-verb method/function names (`fooGet` over `getFoo`).

## Validation

- Run `bun eslint .`.
- Run `bun tsc --noEmit`.
- Run `bun test`.
