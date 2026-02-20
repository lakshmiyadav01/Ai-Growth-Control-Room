'use client'

import { useState } from 'react'
import type { VideoGenerationResponse } from '@/app/types'

interface VideoPlayerProps {
  video: VideoGenerationResponse
  isLoading?: boolean
}

export function VideoPlayer({ video, isLoading = false }: VideoPlayerProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    if (!video.video_url) return

    setIsDownloading(true)
    try {
      const response = await fetch(video.video_url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `video-${Date.now()}.mp4`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Failed to download video')
    } finally {
      setIsDownloading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="card">
        <div className="aspect-video bg-dark-900 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 animate-spin">
              <div className="w-full h-full border-4 border-dark-700 border-t-primary-600 rounded-full" />
            </div>
            <p className="text-dark-400 font-medium">Generating your video...</p>
            <p className="text-sm text-dark-500 mt-1">This may take a minute</p>
          </div>
        </div>
      </div>
    )
  }

  if (video.status === 'failed') {
    return (
      <div className="card bg-red-900/20 border-red-700">
        <div className="aspect-video bg-dark-900 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 font-semibold">❌ Video Generation Failed</p>
            <p className="text-sm text-red-300 mt-2">{video.error || 'Unknown error'}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!video.video_url) {
    return (
      <div className="card">
        <div className="aspect-video bg-dark-900 rounded-lg flex items-center justify-center">
          <p className="text-dark-400">No video generated yet</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="space-y-4">
        {/* Video Player */}
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <video
            src={video.video_url}
            controls
            className="w-full h-full"
            poster={video.thumbnail_url}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <a
            href={video.video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 btn-primary text-center"
          >
            Open in New Tab
          </a>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1 btn-secondary disabled:opacity-50"
          >
            {isDownloading ? '⬇️ Downloading...' : '⬇️ Download'}
          </button>
        </div>

        {/* Video Info */}
        <div className="bg-dark-900 rounded-lg p-4 border border-dark-700">
          <p className="text-xs text-dark-400 font-semibold uppercase tracking-wide mb-2">
            Status
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <p className="text-sm text-dark-300">{video.status}</p>
          </div>
        </div>
      </div>
    </div>
  )
}