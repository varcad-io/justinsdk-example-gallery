# Upstream Modifications

This repository adapts material from `JustinSDK/dotSCAD` into a single varcad.io gallery project.

Repository-specific adjustments include:

- preserving the upstream `examples/` tree for direct browsing
- generating a top-level `index.js` selector entry that chooses which example to render
- exposing the example selector through `widgets.json`
- lazy-loading only the selected example at runtime from `index.js`, instead of importing every example eagerly on first render
- rewriting upstream dotSCAD imports to `@justinsdk/...` so they resolve through the linked JustinSDK library at runtime
- keeping cross-example imports inside `examples/` local to the repository

The intent of these changes is packaging and runtime adaptation, not relicensing of the upstream dotSCAD code.
