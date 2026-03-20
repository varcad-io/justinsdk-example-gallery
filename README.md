# JustinSDK Example Gallery

This repository packages the JustinSDK example set into one varcad.io project.

What it includes:

- the upstream `examples/` tree from `JustinSDK/dotSCAD`
- a generated `index.js` selector entry
- a `widgets.json` dropdown that switches the currently rendered example

Notes:

- The selector options are generated from the example file paths.
- The selector entry lazy-loads only the chosen example at runtime so the whole repo does not need to parse every example on first render.
- The upstream example imports resolve through the linked `justinsdk` library at runtime using `@justinsdk/...` paths.
- The original examples remain available under `examples/` for direct browsing.
- Cross-example references inside `examples/` remain local.

License and attribution:

- See `THIRD_PARTY_NOTICES.md` for attribution and bundled license references.
- See `UPSTREAM_MODIFICATIONS.md` for repository-specific packaging changes made on top of the upstream dotSCAD material.
