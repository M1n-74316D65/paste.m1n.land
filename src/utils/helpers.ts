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
