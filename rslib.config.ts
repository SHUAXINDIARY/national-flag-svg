import { defineConfig } from "@rslib/core";

export default defineConfig({
  lib: [
    {
      format: "iife",
      bundle: true,
      dts: false,
    },
  ],
  output: {
    target: "web",
    cleanDistPath: true,
    minify: true,
    legalComments: "none",
    sourceMap: false,
  },
  source: {
    entry: {
      "rough-emoji": "./src/rough-emoji.ts",
    },
  },
});
