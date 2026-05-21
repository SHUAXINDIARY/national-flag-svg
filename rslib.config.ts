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
  },
  source: {
    entry: {
      "rough-emoji": "./src/rough-emoji.ts",
    },
  },
});
