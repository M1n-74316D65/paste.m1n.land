import type { ThemeObjectOrShikiThemeName } from 'astro-expressive-code'

type Config = {
  author: string
  title: string
  description: string
  lang: string
  themes: {
    dark: ThemeObjectOrShikiThemeName
    light: ThemeObjectOrShikiThemeName
  }
}

export default {
  author: 'M1n',
  title: 'M1n Pastebin',
  description: '',
  lang: 'en',
  themes: {
    dark: 'everforest-dark',
    light: 'everforest-light',
  },
} satisfies Config
