import { NextRequest, NextResponse } from 'next/server'
import { generateCampaign } from '@/app/lib/gemini'
import type { CampaignRequest, ApiResponse, CampaignResponse } from '@/app/types'

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Validate request
    if (!request.body) {
      return NextResponse.json(
        { success: false, error: 'Request body is empty' } as ApiResponse<null>,
        { status: 400 }
      )
    }

    const body = (await request.json()) as CampaignRequest

    // Validate input
    if (!body.topic || typeof body.topic !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Topic is required and must be a string' } as ApiResponse<null>,
        { status: 400 }
      )
    }

    const topic = body.topic.trim()

    if (topic.length === 0 || topic.length > 500) {
      return NextResponse.json(
        { success: false, error: 'Topic must be between 1 and 500 characters' } as ApiResponse<null>,
        { status: 400 }
      )
    }

    // Generate campaign
    const campaign = await generateCampaign(topic)

    return NextResponse.json(
      {
        success: true,
        data: campaign,
      } as ApiResponse<CampaignResponse>,
      { status: 200 }
    )
  } catch (error) {
    console.error('Campaign generation route error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Failed to generate campaign'

    return NextResponse.json(
      { success: false, error: errorMessage } as ApiResponse<null>,
      { status: 500 }
    )
  }
}