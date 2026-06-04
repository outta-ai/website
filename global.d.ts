// Allow side-effect imports of global stylesheets (e.g. `import "@/app/global.css"`).
// TypeScript 6 enables `noUncheckedSideEffectImports` by default, which otherwise
// rejects these bundler-handled CSS imports.
declare module "*.css";
