import { defineConfig } from "@rslib/core";

export default defineConfig({
  lib: [
    {
      id: "esm",
      format: "esm",
      bundle: true,
      dts: true,
      autoExternal: false,
      output: {
        target: "web",
        minify: false,
      },
      source: {
        entry: {
          index: "./src/index.ts",
        },
      },
    },
    {
      id: "cjs",
      format: "cjs",
      bundle: true,
      dts: false,
      autoExternal: false,
      output: {
        target: "node",
        minify: false,
      },
      source: {
        entry: {
          index: "./src/index.ts",
        },
      },
    },
    {
      id: "iife",
      format: "iife",
      bundle: true,
      dts: false,
      autoExternal: false,
      output: {
        target: "web",
        minify: true,
      },
      source: {
        entry: {
          "rough-emoji": "./src/browser.ts",
        },
      },
    },
  ],
  output: {
    cleanDistPath: true,
    legalComments: "none",
    sourceMap: false,
  },
});
