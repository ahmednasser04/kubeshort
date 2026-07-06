import { apiClient } from './api'
import type { ShortUrlRecord, ShortUrlResponse } from '../types/url'

function normalizeUrl(input: string) {
  const trimmed = input.trim()

  if (!trimmed) {
    throw new Error('Please enter a URL.')
  }

  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

export function isValidUrl(value: string) {
  try {
    new URL(normalizeUrl(value))
    return true
  } catch {
    return false
  }
}

export async function shortenUrl(input: string): Promise<ShortUrlRecord> {
  const originalUrl = normalizeUrl(input)
  const response = await apiClient.post<ShortUrlResponse>('/api/v1/urls', {
    originalUrl,
  })

  return response.data.data
}

export async function getUrlByShortCode(shortCode: string): Promise<ShortUrlRecord> {
  const response = await apiClient.get<ShortUrlResponse>(`/api/v1/urls/${shortCode}`)

  return response.data.data
}