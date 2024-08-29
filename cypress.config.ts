import viteConfig from './vite.config.cypress.component.js'
import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
      viteConfig,
    },
  },
});
