import type { CampaignResponse } from '@/app/types'

interface CampaignCardProps {
  campaign: CampaignResponse
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <div className="space-y-6">
      {/* Hook Card */}
      <div className="card">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-bold text-primary-400">Hook</h3>
          <span className="text-xs px-3 py-1 bg-primary-600/20 text-primary-400 rounded-full">
            Primary Asset
          </span>
        </div>
        <p className="text-xl font-semibold text-white leading-relaxed">
          {campaign.hook}
        </p>
      </div>

      {/* Reel Script */}
      <div className="card">
        <h3 className="text-lg font-bold text-primary-400 mb-4">Reel Script</h3>
        <p className="text-white whitespace-pre-wrap leading-relaxed">
          {campaign.reel_script}
        </p>
      </div>

      {/* Captions Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Instagram Caption */}
        <div className="card">
          <h3 className="text-lg font-bold text-primary-400 mb-4">Instagram Caption</h3>
          <p className="text-white whitespace-pre-wrap leading-relaxed">
            {campaign.instagram_caption}
          </p>
        </div>

        {/* LinkedIn Caption */}
        <div className="card">
          <h3 className="text-lg font-bold text-primary-400 mb-4">LinkedIn Caption</h3>
          <p className="text-white whitespace-pre-wrap leading-relaxed">
            {campaign.linkedin_caption}
          </p>
        </div>
      </div>

      {/* Hashtags */}
      <div className="card">
        <h3 className="text-lg font-bold text-primary-400 mb-4">Hashtags</h3>
        <div className="flex flex-wrap gap-3">
          {campaign.hashtags.map((tag, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-primary-400 hover:border-primary-600 transition-all duration-200 cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* CTA & Best Post Time */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-sm font-semibold text-dark-300 uppercase tracking-wide mb-2">
            Call To Action
          </h3>
          <p className="text-lg font-semibold text-white">{campaign.cta}</p>
        </div>

        <div className="card">
          <h3 className="text-sm font-semibold text-dark-300 uppercase tracking-wide mb-2">
            Best Post Time
          </h3>
          <p className="text-lg font-semibold text-white">{campaign.best_post_time}</p>
        </div>
      </div>

      {/* Engagement Score */}
      <div className="card">
        <h3 className="text-sm font-semibold text-dark-300 uppercase tracking-wide mb-4">
          Engagement Prediction
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="w-full h-3 bg-dark-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
                style={{
                  width: `${campaign.engagement_prediction_score}%`,
                }}
              />
            </div>
          </div>
          <span className="text-2xl font-bold text-primary-400">
            {campaign.engagement_prediction_score}
          </span>
        </div>
      </div>

      {/* Strategy Advice */}
      <div className="card bg-dark-800/50 border border-primary-600/20">
        <h3 className="text-lg font-bold text-primary-400 mb-4">🎯 Strategy Advice</h3>
        <p className="text-white leading-relaxed">{campaign.strategy_advice}</p>
      </div>

      {/* Carousel Post */}
      <div className="card">
        <h3 className="text-lg font-bold text-primary-400 mb-6">Carousel Post</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { slide: 'slide_1', label: 'Slide 1', text: campaign.carousel_post.slide_1 },
            { slide: 'slide_2', label: 'Slide 2', text: campaign.carousel_post.slide_2 },
            { slide: 'slide_3', label: 'Slide 3', text: campaign.carousel_post.slide_3 },
          ].map(({ label, text }) => (
            <div key={label} className="bg-dark-900 border border-dark-700 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-dark-300 mb-3">{label}</h4>
              <p className="text-sm text-white whitespace-pre-wrap leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnail Text */}
      <div className="card">
        <h3 className="text-lg font-bold text-primary-400 mb-4">Video Thumbnail Text</h3>
        <div className="bg-dark-900 rounded-lg p-8 text-center border border-dark-700">
          <p className="text-2xl font-bold text-white">{campaign.thumbnail_text}</p>
        </div>
      </div>

      {/* Video Blueprint */}
      <div className="card">
        <h3 className="text-lg font-bold text-primary-400 mb-6">🎬 Video Blueprint</h3>
        <div className="space-y-4">
          {[
            { scene: 'scene_1', label: 'Scene 1', text: campaign.video_blueprint.scene_1 },
            { scene: 'scene_2', label: 'Scene 2', text: campaign.video_blueprint.scene_2 },
            { scene: 'scene_3', label: 'Scene 3', text: campaign.video_blueprint.scene_3 },
          ].map(({ label, text }) => (
            <div key={label} className="bg-dark-900 border border-dark-700 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-primary-400 mb-2">{label}</h4>
              <p className="text-sm text-white whitespace-pre-wrap leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}