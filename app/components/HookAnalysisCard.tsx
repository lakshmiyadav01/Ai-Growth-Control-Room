import type { HookAnalysisResponse } from '@/app/types'

interface HookAnalysisCardProps {
  analysis: HookAnalysisResponse
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-dark-300">{label}</label>
        <span className="text-sm font-bold text-primary-400">{score}/100</span>
      </div>
      <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

export function HookAnalysisCard({ analysis }: HookAnalysisCardProps) {
  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="card bg-gradient-to-br from-dark-800 to-dark-900 border border-primary-600/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-primary-400">Hook Score</h3>
          <div className="w-20 h-20 rounded-full bg-dark-700 flex items-center justify-center border-2 border-primary-600">
            <span className="text-3xl font-bold text-primary-400">{analysis.score}</span>
          </div>
        </div>
        <p className="text-sm text-dark-300">
          {analysis.score >= 80
            ? '🔥 Excellent hook with strong engagement potential'
            : analysis.score >= 60
              ? '👍 Good hook with solid engagement potential'
              : '💡 Hook has potential. Consider the suggestions below to improve.'}
        </p>
      </div>

      {/* Score Breakdown */}
      <div className="card">
        <h3 className="text-lg font-bold text-primary-400 mb-6">Score Breakdown</h3>
        <div className="space-y-4">
          <ScoreBar label="Emotional Trigger" score={analysis.emotional_trigger_score} />
          <ScoreBar label="Curiosity Gap" score={analysis.curiosity_gap_score} />
          <ScoreBar label="Clarity" score={analysis.clarity_score} />
        </div>
      </div>

      {/* Improved Hook */}
      <div className="card border-l-4 border-l-primary-600">
        <h3 className="text-lg font-bold text-primary-400 mb-4">✨ Improved Hook</h3>
        <p className="text-lg text-white font-semibold leading-relaxed">
          {analysis.improved_hook}
        </p>
      </div>

      {/* Psychological Reasoning */}
      <div className="card">
        <h3 className="text-lg font-bold text-primary-400 mb-4">🧠 Why It Works</h3>
        <p className="text-white leading-relaxed whitespace-pre-wrap">
          {analysis.psychological_reasoning}
        </p>
      </div>

      {/* Scroll Stopping Tips */}
      <div className="card bg-dark-800/50">
        <h3 className="text-lg font-bold text-primary-400 mb-4">🎯 Scroll-Stopping Tips</h3>
        <p className="text-white leading-relaxed whitespace-pre-wrap">
          {analysis.scroll_stopping_tips}
        </p>
      </div>
    </div>
  )
}