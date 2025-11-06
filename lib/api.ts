// Centralized API utilities

export interface ApiError {
  message: string
  code?: string
  status?: number
}

export class ApiException extends Error {
  code?: string
  status?: number

  constructor(message: string, code?: string, status?: number) {
    super(message)
    this.name = 'ApiException'
    this.code = code
    this.status = status
  }
}

// Generic API fetch wrapper with error handling
export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiException(
        errorData.error || errorData.message || 'An error occurred',
        errorData.code,
        response.status
      )
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiException) {
      throw error
    }
    throw new ApiException(
      error instanceof Error ? error.message : 'Network error occurred'
    )
  }
}

// Waitlist API
export interface WaitlistRequest {
  name: string
  email: string
  country: string
  source?: string
  timestamp?: string
}

export interface WaitlistResponse {
  success: boolean
  message?: string
}

export async function submitWaitlist(
  data: WaitlistRequest
): Promise<WaitlistResponse> {
  // TODO: Replace with actual API endpoint
  // For now, simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    throw new ApiException('Invalid email address', 'INVALID_EMAIL', 400)
  }

  return {
    success: true,
    message: 'Successfully joined waitlist',
  }
}

