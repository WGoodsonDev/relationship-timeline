'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function LoginForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  useEffect(() => {
    if (error === 'access_denied') {
      setFormError("Sorry, you're not on the guest list for this one 💕")
    } else if (error === 'auth_failed') {
      setFormError('Authentication failed. Please try again.')
    }
  }, [error])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setFormError(null)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    setLoading(false)
    if (authError) {
      setFormError(authError.message)
    } else {
      setSent(true)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#fef8ef' }}
    >
      <div
        className="w-full max-w-sm rounded-3xl shadow-xl p-8 text-center"
        style={{ backgroundColor: '#fff8f0' }}
      >
        <div className="text-5xl mb-4">💕</div>
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: '#6b4c3b', fontFamily: 'Georgia, serif' }}
        >
          Our Story
        </h1>
        <p className="text-sm mb-8" style={{ color: '#b89a88', fontFamily: 'Georgia, serif' }}>
          A private place for just the two of us
        </p>

        {sent ? (
          <div>
            <div className="text-4xl mb-4">✉️</div>
            <p className="text-sm" style={{ color: '#7a5c4a', fontFamily: 'Georgia, serif' }}>
              Check your inbox — we sent a magic link to <strong>{email}</strong>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && (
              <p
                className="text-sm px-3 py-2 rounded-lg"
                style={{ backgroundColor: '#fdecd9', color: '#8b3a1f' }}
              >
                {formError}
              </p>
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full rounded-xl border px-4 py-3 text-sm focus:outline-none"
              style={{
                borderColor: '#e8c9b0',
                backgroundColor: '#fffaf5',
                color: '#6b4c3b',
                fontFamily: 'Georgia, serif',
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-3 text-white font-medium transition-opacity disabled:opacity-60"
              style={{ backgroundColor: '#c8765a', fontFamily: 'Georgia, serif' }}
            >
              {loading ? 'Sending...' : 'Send magic link'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
