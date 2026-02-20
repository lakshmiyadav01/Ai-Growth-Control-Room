import { NextRequest, NextResponse } from 'next/server'
import { generateVideoPrompt } from '@/app/lib/gemini'
import { generateVideo, initializeVideoApi } from '@/app/lib/video'
import type { VideoGenerationRequest, ApiResponse, VideoGenerationResponse } from '@/app/types'

// Initialize video API on module load
initializeVideoApi()

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Validate request
    if (!request.body) {
      return NextResponse.json(
        { success: false, error: 'Request body is empty' } as ApiResponse<null>,
        { status: 400 }
      )
    }

    const body = (await request.json()) as VideoGenerationRequest

    // Validate inputs
    if (!body.topic || typeof body.topic !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Topic is required and must be a string' } as ApiResponse<null>,
        { status: 400 }
      )
    }

    if (!body.hook || typeof body.hook !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Hook is required and must be a string' } as ApiResponse<null>,
        { status: 400 }
      )
    }

    if (!['cinematic', 'energetic', 'professional'].includes(body.style)) {
      return NextResponse.json(
        { success: false, error: 'Style must be cinematic, energetic, or professional' } as ApiResponse<null>,
        { status: 400 }
      )
    }

    const topic = body.topic.trim()
    const hook = body.hook.trim()
    const style = body.style as 'cinematic' | 'energetic' | 'professional'

    if (topic.length === 0 || topic.length > 500) {
      return NextResponse.json(
        { success: false, error: 'Topic must be between 1 and 500 characters' } as ApiResponse<null>,
        { status: 400 }
      )
    }

    if (hook.length === 0 || hook.length > 300) {
      return NextResponse.json(
        { success: false, error: 'Hook must be between 1 and 300 characters' } as ApiResponse<null>,
        { status: 400 }
      )
    }

    // Generate detailed video prompt
    const videoPrompt = await generateVideoPrompt(topic, hook, style)

    // Generate video
    const videoResponse = await generateVideo(videoPrompt, style)

    return NextResponse.json(
      {
        success: true,
        data: videoResponse,
      } as ApiResponse<VideoGenerationResponse>,
      { status: 200 }
    )
  } catch (error) {
    console.error('Video generation route error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Failed to generate video'

    return NextResponse.json(
      { success: false, error: errorMessage } as ApiResponse<null>,
      { status: 500 }
    )
  }
}