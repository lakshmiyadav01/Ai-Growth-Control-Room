import { NextRequest, NextResponse } from 'next/server'
import { analyzeHook } from '@/app/lib/gemini'
import type { HookAnalysisRequest, ApiResponse, HookAnalysisResponse } from '@/app/types'

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Validate request
    if (!request.body) {
      return NextResponse.json(
        { success: false, error: 'Request body is empty' } as ApiResponse<null>,
        { status: 400 }
      )
    }

    const body = (await request.json()) as HookAnalysisRequest

    // Validate input
    if (!body.hook || typeof body.hook !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Hook is required and must be a string' } as ApiResponse<null>,
        { status: 400 }
      )
    }

    const hook = body.hook.trim()

    if (hook.length === 0 || hook.length > 300) {
      return NextResponse.json(
        { success: false, error: 'Hook must be between 1 and 300 characters' } as ApiResponse<null>,
        { status: 400 }
      )
    }

    // Analyze hook
    const analysis = await analyzeHook(hook)

    return NextResponse.json(
      {
        success: true,
        data: analysis,
      } as ApiResponse<HookAnalysisResponse>,
      { status: 200 }
    )
  } catch (error) {
    console.error('Hook analysis route error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze hook'

    return NextResponse.json(
      { success: false, error: errorMessage } as ApiResponse<null>,
      { status: 500 }
    )
  }
}