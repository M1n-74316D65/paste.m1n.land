import config from '@/config'
import { useEffect, useState } from 'react'

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme) {
      const element = document.documentElement
      const isDark = savedTheme === 'dark'
      element.classList.toggle('dark', isDark)
      element.setAttribute(
        'data-theme',
        config.themes[isDark ? 'dark' : 'light'],
      )
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches
      const element = document.documentElement
      element.classList.toggle('dark', prefersDark)
      element.setAttribute(
        'data-theme',
        config.themes[prefersDark ? 'dark' : 'light'],
      )
    }

    // Add listener for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const element = document.documentElement
        element.classList.toggle('dark', e.matches)
        element.setAttribute(
          'data-theme',
          config.themes[e.matches ? 'dark' : 'light'],
        )
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    setMounted(true)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const handleToggleClick = () => {
    const element = document.documentElement
    element.classList.toggle('dark')

    const isDark = element.classList.contains('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')

    element.setAttribute('data-theme', config.themes[isDark ? 'dark' : 'light'])
  }

  if (!mounted) {
    return null // Avoid rendering anything on the server
  }

  return (
    <div className="flex flex-col justify-center">
      <input
        type="checkbox"
        name="light-switch"
        className="light-switch sr-only"
        id="themeswitcherxd"
        checked={document.documentElement.classList.contains('dark')}
        onChange={handleToggleClick}
      />
      <label className="relative cursor-pointer" htmlFor="themeswitcherxd">
        <svg
          className="hidden dark:block"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-darkText"
            d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
          ></path>
          <path
            className="fill-darkText"
            d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
          ></path>
        </svg>
        <svg
          className="dark:hidden"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-text"
            d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
          ></path>
          <path
            className="fill-text"
            d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
          ></path>
        </svg>
        <span className="sr-only">Switch to light / dark version</span>
      </label>
    </div>
  )
}
