// Campaign Generation Types
export interface CampaignRequest {
  topic: string
}

export interface CarouselPost {
  slide_1: string
  slide_2: string
  slide_3: string
}

export interface VideoBlueprint {
  scene_1: string
  scene_2: string
  scene_3: string
}

export interface CampaignResponse {
  hook: string
  reel_script: string
  instagram_caption: string
  linkedin_caption: string
  hashtags: string[]
  cta: string
  best_post_time: string
  engagement_prediction_score: number
  strategy_advice: string
  carousel_post: CarouselPost
  thumbnail_text: string
  video_blueprint: VideoBlueprint
}

// Hook Analysis Types
export interface HookAnalysisRequest {
  hook: string
}

export interface HookAnalysisResponse {
  score: number
  emotional_trigger_score: number
  curiosity_gap_score: number
  clarity_score: number
  improved_hook: string
  psychological_reasoning: string
  scroll_stopping_tips: string
}

// Video Generation Types
export interface VideoGenerationRequest {
  topic: string
  hook: string
  style: 'cinematic' | 'energetic' | 'professional'
}

export interface VideoGenerationResponse {
  video_url: string
  thumbnail_url: string
  status: 'completed' | 'processing' | 'failed'
  error?: string
}

// API Response Wrapper
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}