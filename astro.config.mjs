import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import expressiveCode from 'astro-expressive-code'
import mdx from '@astrojs/mdx'
import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [
    tailwind(),
    react(),
    expressiveCode({
      themes: ['everforest-dark', 'everforest-light'],
      styleOverrides: {
        frames: {
          editorActiveTabIndicatorTopColor: 'transparent',
          editorActiveTabBorderColor: '#80808080',
          editorTabBarBorderBottomColor: '#80808080',
          tooltipSuccessBackground: 'black',
        },
        uiFontFamily: 'inherit',
        borderColor: '#80808080',
      },
    }),
    mdx(),
  ],
  site: 'https://paste.m1n.land/',
  adapter: vercel(),
})
