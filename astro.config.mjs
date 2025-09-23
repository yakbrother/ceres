import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// Site configuration
export const siteConfig = {
  title: "My Digital Brain",
  author: "Your Name",
  email: "your.email@domain.com",
  description: "Personal knowledge base and documentation",
  url: "https://yourdomain.com",
  social: {
    twitter: "@username",
    github: "username",
    linkedin: "username",
  },
};

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url,
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: "github-dark-dimmed",
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["pagefind"],
    },
    build: {
      rollupOptions: {
        external: ["/pagefind/pagefind.js"],
      },
    },
  },
});
