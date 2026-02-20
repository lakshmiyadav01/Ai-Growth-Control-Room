'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <main className="min-h-screen bg-dark-900">
      {/* Navigation */}
      <nav className="border-b border-dark-700 bg-dark-800/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center font-bold text-lg">
              AI
            </div>
            <h1 className="text-xl font-bold text-white">Growth Control Room</h1>
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard" className="btn-secondary text-sm">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Command Your Social Media Strategy
          </h2>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto mb-8">
            AI-powered campaign generation, hook analysis, and video creation. Everything you need to grow, in one dashboard.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard" className="btn-primary">
              Launch Dashboard →
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: '✨',
              title: 'AI Campaign Generator',
              description: 'Generate hooks, scripts, captions & hashtags from a single prompt',
            },
            {
              icon: '🎯',
              title: 'Hook Analyzer',
              description: 'Scientifically analyze hooks with engagement scoring',
            },
            {
              icon: '🎬',
              title: 'Video Generation',
              description: 'Create real MP4 videos with AI-powered blueprints',
            },
          ].map((feature, idx) => (
            <div key={idx} className="card-hover">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-dark-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-700 bg-dark-800/50 py-8 mt-24">
        <div className="max-w-7xl mx-auto px-6 text-center text-dark-400">
          <p>AI Growth Control Room © 2026. Built for Indian creators.</p>
        </div>
      </footer>
    </main>
  )
}