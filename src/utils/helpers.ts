import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeRaw from 'rehype-raw'

/**
 * Formats a date string to "7 Oct 2024" format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'short' })
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

/**
 * Renders markdown content to HTML
 */
export const renderMarkdown = async (content: string): Promise<string> => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(content || '')

  return result.toString()
}

/**
 * Converts a string into a URL-friendly slug.
 *
 * @param text - The string to convert into a slug
 * @returns A lowercase, hyphenated string with special characters removed
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD') // Split accented letters into base letter and accent
    .replace(/[\u0300-\u036f]/g, '') // Remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace whitespace with hyphens
    .replace(/[^\w-]+/g, '') // Remove non-word chars (except hyphens)
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
}
