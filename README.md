# JustinSDK Example Gallery

This repository packages the JustinSDK example set into one varcad.io project.

What it includes:

- the upstream `examples/` tree from `JustinSDK/dotSCAD`
- a local copy of `src/` so the examples stay self-contained
- a generated `index.js` selector entry
- a `widgets.json` dropdown that switches the currently rendered example

Notes:

- The selector options are generated from the example file paths.
- A few upstream references were normalized during import so the current dotSCAD tree resolves cleanly inside this standalone repo.
- The original examples remain available under `examples/` for direct browsing.
