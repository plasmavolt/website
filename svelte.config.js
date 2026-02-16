import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    paths: {
      // Only needed if deploying to username.github.io/website
      base: process.env.NODE_ENV === 'production' ? '/website' : ''
    }
  },
};

export default config;