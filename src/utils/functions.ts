/**
 * Extracts the filename without its extension
 * @param fileName - The filename including extension
 * @returns The filename without extension
 */
export function getFileNameWithoutExtension(fileName: string): string {
  return fileName.split('.')[0]
}

/**
 * Fetches text content from a URL
 * @param url - The URL to fetch from
 * @returns Promise resolving to the text content
 */
export async function fetchRawUrl(url: string): Promise<string> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Failed to fetch from ${url}: ${response.status} ${response.statusText}`,
    )
  }

  return response.text()
}

/**
 * Formats a date string to "DD MMM YYYY" format
 * @param date - ISO date string
 * @returns Formatted date string
 */
export function convertDate(date: string): string {
  const dateObj = new Date(date)
  const month = dateObj.toLocaleString('default', { month: 'short' })
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()

  return `${day} ${month} ${year}`
}

/**
 * Calculates estimated reading time for text content
 * @param text - The content to calculate reading time for
 * @returns Formatted reading time (e.g., "3 mins read")
 */
export function calculateReadingTime(text: string): string {
  const WORDS_PER_MINUTE = 200
  const wordCount = text.split(/\s+/g).length
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE)

  return minutes === 1 ? '1 min read' : `${minutes} mins read`
}
