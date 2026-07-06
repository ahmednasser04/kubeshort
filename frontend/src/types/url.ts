export type UrlStatus = 'Active' | 'Paused'

export interface UrlStats {
  id: string
  clicks: number
  shortCode: string
  createdAt: string
  status: UrlStatus
}

export interface ShortUrlRecord extends UrlStats {
  originalUrl: string
  shortUrl: string
}