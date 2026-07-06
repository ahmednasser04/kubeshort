export type UrlStatus = 'ACTIVE' | 'DELETED'

export interface ShortUrlRecord {
  clicks: number
  createdAt: string
  id: string
  originalUrl: string
  shortCode: string
  shortUrl: string
  status: UrlStatus
  updatedAt: string
}

export interface ShortUrlResponse {
  data: ShortUrlRecord
  message: string
  success: boolean
}