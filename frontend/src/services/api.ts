import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_URL?.trim()

if (!apiBaseUrl) {
  throw new Error('VITE_API_URL is required.')
}

export const apiClient = axios.create({
  baseURL: apiBaseUrl.replace(/\/+$/, ''),
  headers: {
    'Content-Type': 'application/json',
  },
})

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const responseMessage = error.response?.data?.message

    if (typeof responseMessage === 'string' && responseMessage.trim()) {
      return responseMessage
    }

    return error.message || 'Unable to reach the backend service.'
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message
  }

  return 'Unable to shorten the URL.'
}
