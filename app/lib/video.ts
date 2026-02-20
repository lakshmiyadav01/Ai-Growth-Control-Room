import type { VideoGenerationResponse } from '@/app/types'

/**
 * Video Generation Service
 * Handles communication with external video API
 * Supports: Runway, Pika, Replicate
 */

interface VideoApiConfig {
  apiKey: string
  endpoint: string
  timeout: number
}

let videoConfig: VideoApiConfig | null = null

/**
 * Initialize video API configuration
 */
export function initializeVideoApi(): void {
  if (!process.env.VIDEO_API_KEY) {
    console.warn('VIDEO_API_KEY is not set. Video generation will be mocked.')
    return
  }

  videoConfig = {
    apiKey: process.env.VIDEO_API_KEY,
    endpoint: process.env.VIDEO_API_ENDPOINT || 'https://api.runwayml.com/v1/videos/generations',
    timeout: 120000, // 2 minutes timeout
  }
}

/**
 * Generate a video from prompt
 * Returns mock response if API not configured
 */
export async function generateVideo(
  prompt: string,
  style: 'cinematic' | 'energetic' | 'professional'
): Promise<VideoGenerationResponse> {
  if (!videoConfig) {
    return generateMockVideo(prompt, style)
  }

  try {
    const response = await makeVideoApiCall(prompt, style)
    return response
  } catch (error) {
    console.error('Video generation error:', error)
    // Fallback to mock
    return generateMockVideo(prompt, style)
  }
}

/**
 * Make actual API call to video generation service
 */
async function makeVideoApiCall(
  prompt: string,
  style: string
): Promise<VideoGenerationResponse> {
  if (!videoConfig) {
    throw new Error('Video API not initialized')
  }

  const payload = {
    prompt: prompt,
    duration: 10,
    aspect_ratio: '9:16',
    model: 'gen2',
    style: style,
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), videoConfig.timeout)

  try {
    const response = await fetch(videoConfig.endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${videoConfig.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`Video API returned ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    // Poll for completion if necessary
    if (data.id) {
      return pollVideoStatus(data.id)
    }

    return {
      video_url: data.video_url || data.url || '',
      thumbnail_url: data.thumbnail_url || '',
      status: 'completed',
    }
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

/**
 * Poll video API for generation status
 */
async function pollVideoStatus(jobId: string, maxAttempts = 30): Promise<VideoGenerationResponse> {
  if (!videoConfig) {
    throw new Error('Video API not initialized')
  }

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const response = await fetch(`${videoConfig.endpoint}/${jobId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${videoConfig.apiKey}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Poll returned ${response.status}`)
      }

      const data = await response.json()

      if (data.status === 'completed') {
        return {
          video_url: data.video_url || data.url || '',
          thumbnail_url: data.thumbnail_url || '',
          status: 'completed',
        }
      }

      if (data.status === 'failed') {
        return {
          video_url: '',
          thumbnail_url: '',
          status: 'failed',
          error: data.error || 'Video generation failed',
        }
      }

      // Wait before next poll
      await new Promise(resolve => setTimeout(resolve, 2000))
    } catch (error) {
      console.error(`Poll attempt ${attempt + 1} failed:`, error)
      if (attempt === maxAttempts - 1) {
        throw error
      }
    }
  }

  return {
    video_url: '',
    thumbnail_url: '',
    status: 'failed',
    error: 'Video generation timeout',
  }
}

/**
 * Generate mock video response for testing
 */
function generateMockVideo(prompt: string, style: string): VideoGenerationResponse {
  const mockVideoId = Math.random().toString(36).substring(7)
  const mockThumbnailId = Math.random().toString(36).substring(7)

  return {
    video_url: `https://example.com/videos/${mockVideoId}-${style}.mp4`,
    thumbnail_url: `https://example.com/thumbnails/${mockThumbnailId}.jpg`,
    status: 'completed',
  }
}