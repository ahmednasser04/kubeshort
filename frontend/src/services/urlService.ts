import type { ShortUrlRecord } from '../types/url'

const SHORTENER_HOST = 'https://kubeshort.app'
const SHORT_CODE_LENGTH = 7

function normalizeUrl(input: string) {
  const trimmed = input.trim()

  if (!trimmed) {
    throw new Error('Please enter a URL.')
  }

  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

function createShortCode(length = SHORT_CODE_LENGTH) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const randomValues = crypto.getRandomValues(new Uint8Array(length))

  return Array.from(randomValues, (value) => alphabet[value % alphabet.length]).join('')
}

function createPlaceholderId() {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `uuid-${createShortCode(12)}`
}

export function isValidUrl(value: string) {
  try {
    new URL(normalizeUrl(value))
    return true
  } catch {
    return false
  }
}

export async function shortenUrlMock(input: string): Promise<ShortUrlRecord> {
  const originalUrl = normalizeUrl(input)
  const shortCode = createShortCode()

  await new Promise((resolve) => setTimeout(resolve, 800))

  return {
    id: createPlaceholderId(),
    originalUrl,
    shortCode,
    shortUrl: `${SHORTENER_HOST}/${shortCode}`,
    clicks: 0,
    createdAt: 'Just now',
    status: 'Active',
  }
}