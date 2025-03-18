import { slugify } from './helpers'
import { calculateReadingTime, convertDate, fetchRawUrl } from './functions'
import matter from 'gray-matter'

// Type Definitions
export interface Repo {
  name: string
  description: string
  html_url: string
  updated_at: string
}

export type MetaData = {
  title?: string
  category?: string
  date?: string
  tags?: string[]
}

export interface FileObject {
  filename: string
  type: string
  language: string
  raw_url: string
  size: number
  content: string
}

export interface File {
  [key: string]: FileObject
}

export interface Gist {
  id: string
  description: string
  html_url: string
  files: File
  created_at: string
  comments: number
  comments_url: string
  markdownFileName?: string
  rawContent?: string
  rawUrl?: string
  title?: string
  metaData?: MetaData
  readingTime?: string
  articleDate?: string
  markdownContent?: string
}

export interface User {
  login: string
  avatar_url: string
}

export interface UserDetail {
  html_url: string
  name: string
  company: string
  blog: string
  location: string
  email: string
  bio: string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  hireable: boolean
  twitter_username: string
}

export interface Comment {
  id: string
  body: string
  user: User
  created_at: string
}

// Cache implementation
interface CacheItem<T> {
  data: T
  timestamp: number
}

const cache: {
  markdownGists?: CacheItem<Gist[]>
  comments: Record<string, CacheItem<Comment[]>>
} = {
  comments: {},
}

// Cache durations in milliseconds
const MARKDOWN_GISTS_CACHE_DURATION = 15 * 60 * 1000 // 15 minutes
const COMMENTS_CACHE_DURATION = 60 * 60 * 1000 // 1 hour

// Config
const GITHUB_NAME = import.meta.env.GITHUB_NAME
const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN

const HEADERS = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
}

// API endpoints
const GITHUB_API_BASE = 'https://api.github.com'
const REPOS_ENDPOINT = `${GITHUB_API_BASE}/users/${GITHUB_NAME}/repos`
const GISTS_ENDPOINT = `${GITHUB_API_BASE}/users/${GITHUB_NAME}/gists`
const USER_ENDPOINT = `${GITHUB_API_BASE}/users/${GITHUB_NAME}`

/**
 * Fetches repositories sorted by most recently updated
 */
export const getRepos = async (): Promise<Repo[]> => {
  try {
    const response = await fetch(REPOS_ENDPOINT, { headers: HEADERS })

    if (!response.ok) {
      console.error(
        `GitHub API error: ${response.status} ${response.statusText}`,
      )
      return []
    }

    const repos = (await response.json()) as Repo[]

    return repos.sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    )
  } catch (error) {
    console.error('Failed to fetch repositories:', error)
    return []
  }
}

/**
 * Fetches all gists from GitHub
 */
export async function getGists(): Promise<Gist[]> {
  try {
    const response = await fetch(GISTS_ENDPOINT, { headers: HEADERS })

    if (!response.ok) {
      console.error(
        `GitHub API error: ${response.status} ${response.statusText}`,
      )
      return []
    }

    const data = await response.json()

    if (!Array.isArray(data)) {
      console.error("GitHub API didn't return an array:", data)
      return []
    }

    return data as Gist[]
  } catch (error) {
    console.error('Failed to fetch gists:', error)
    return []
  }
}

/**
 * Gets paths for all markdown gists (for Astro's SSG)
 */
export const getGistPaths = async (): Promise<string[]> => {
  const gists = await getGists()

  return gists
    .filter((gist) =>
      Object.values(gist.files).some((file) => file.type === 'text/markdown'),
    )
    .map((gist) => {
      const firstFile = Object.values(gist.files)[0]
      const firstFileName = firstFile.filename.split('.')[0]
      return slugify(firstFileName)
    })
}

/**
 * Gets and processes all markdown gists with their content
 * Results are cached for 15 minutes
 */
export const getMarkdownGists = async (): Promise<Gist[]> => {
  // Check if we have a valid cache
  const now = Date.now()
  if (
    cache.markdownGists &&
    now - cache.markdownGists.timestamp < MARKDOWN_GISTS_CACHE_DURATION
  ) {
    return cache.markdownGists.data
  }

  const gists = await getGists()

  const markdownGists = gists.filter((gist) =>
    Object.values(gist.files).some((file) => file.type === 'text/markdown'),
  )

  const result = await Promise.all(
    markdownGists.map(async (gist) => {
      try {
        const firstFile = Object.values(gist.files)[0]
        const firstFileName = firstFile.filename.split('.')[0]
        const formattedTitle = firstFileName
          .split('-')
          .map((word, index) =>
            index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word,
          )
          .join(' ')
        const rawUrl = firstFile.raw_url
        const articleDate = convertDate(gist.created_at)
        const rawContent = await fetchRawUrl(rawUrl)

        // Process frontmatter
        const { data: metaData, content: markdownContent } = matter(rawContent)
        const readingTime = await calculateReadingTime(markdownContent)

        // Process tags if they exist
        const tags = metaData.tags
          ? typeof metaData.tags === 'string'
            ? metaData.tags.split(',')
            : metaData.tags
          : []

        return {
          ...gist,
          markdownFileName: slugify(firstFileName),
          rawUrl,
          title: formattedTitle,
          articleDate,
          rawContent,
          metaData: { ...metaData, tags },
          markdownContent,
          readingTime,
        }
      } catch (error) {
        console.error(`Error processing gist ${gist.id}:`, error)
        return gist // Return the original gist without enhancements
      }
    }),
  )

  // Update the cache
  cache.markdownGists = {
    data: result,
    timestamp: now,
  }

  return result
}

/**
 * Fetches comments for a specific gist
 * Results are cached for 1 hour
 */
export const getCommentsByGist = async (gist: Gist): Promise<Comment[]> => {
  const now = Date.now()
  const cacheKey = gist.id

  // Check if we have a valid cache for this gist's comments
  if (
    cache.comments[cacheKey] &&
    now - cache.comments[cacheKey].timestamp < COMMENTS_CACHE_DURATION
  ) {
    return cache.comments[cacheKey].data
  }

  try {
    const response = await fetch(gist.comments_url, { headers: HEADERS })

    if (!response.ok) {
      console.error(
        `GitHub API error: ${response.status} ${response.statusText}`,
      )
      return []
    }

    const comments = (await response.json()) as Comment[]

    // Update the cache
    cache.comments[cacheKey] = {
      data: comments,
      timestamp: now,
    }

    return comments
  } catch (error) {
    console.error(`Failed to fetch comments for gist ${gist.id}:`, error)
    return []
  }
}

/**
 * Fetches GitHub user details
 */
export const getGithubUser = async (): Promise<UserDetail | null> => {
  try {
    const response = await fetch(USER_ENDPOINT, { headers: HEADERS })

    if (!response.ok) {
      console.error(
        `GitHub API error: ${response.status} ${response.statusText}`,
      )
      return null
    }

    return (await response.json()) as UserDetail
  } catch (error) {
    console.error('Failed to fetch GitHub user:', error)
    return null
  }
}

/**
 * Returns the user's avatar URL
 */
export const getUserAvatar = (): string => {
  return `https://github.com/${GITHUB_NAME}.png`
}
