'use client'

import { useState, useEffect } from 'react'
import { PALETTE, EMOJI_OPTIONS } from '@/lib/constants'
import type { TimelineEvent, EventFormData } from '@/lib/types'

interface Props {
  event?: TimelineEvent | null
  onSave: (data: EventFormData) => void
  onClose: () => void
}

const EMPTY: EventFormData = {
  date: new Date().toISOString().slice(0, 10),
  title: '',
  description: '',
  emoji: '✨',
  color: '#c8765a',
}

export default function EventModal({ event, onSave, onClose }: Props) {
  const [form, setForm] = useState<EventFormData>(EMPTY)

  useEffect(() => {
    setForm(event ? {
      date: event.date,
      title: event.title,
      description: event.description ?? '',
      emoji: event.emoji,
      color: event.color,
    } : EMPTY)
  }, [event])

  function set(field: keyof EventFormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.date || !form.title.trim()) return
    onSave(form)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-4"
        style={{ backgroundColor: '#fff8f0', fontFamily: 'Georgia, serif' }}
      >
        <h2 className="text-xl font-semibold" style={{ color: '#6b4c3b' }}>
          {event ? 'Edit Memory' : 'Add a Memory'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date */}
          <div>
            <label className="block text-sm mb-1" style={{ color: '#9b7b6b' }}>Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => set('date', e.target.value)}
              required
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none"
              style={{ borderColor: '#e8c9b0', backgroundColor: '#fffaf5', color: '#6b4c3b' }}
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm mb-1" style={{ color: '#9b7b6b' }}>Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              required
              placeholder="What happened?"
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none"
              style={{ borderColor: '#e8c9b0', backgroundColor: '#fffaf5', color: '#6b4c3b' }}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-1" style={{ color: '#9b7b6b' }}>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Tell the story..."
              rows={3}
              className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none resize-none"
              style={{ borderColor: '#e8c9b0', backgroundColor: '#fffaf5', color: '#6b4c3b' }}
            />
          </div>

          {/* Emoji */}
          <div>
            <label className="block text-sm mb-2" style={{ color: '#9b7b6b' }}>Emoji</label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map((em) => (
                <button
                  key={em}
                  type="button"
                  onClick={() => set('emoji', em)}
                  className="w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: form.emoji === em ? '#f0d9c8' : '#fff0e6',
                    border: form.emoji === em ? '2px solid #c8765a' : '2px solid transparent',
                  }}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm mb-2" style={{ color: '#9b7b6b' }}>Color</label>
            <div className="flex gap-2">
              {PALETTE.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => set('color', c)}
                  className="w-8 h-8 rounded-full transition-transform"
                  style={{
                    backgroundColor: c,
                    transform: form.color === c ? 'scale(1.2)' : 'scale(1)',
                    outline: form.color === c ? `3px solid ${c}` : 'none',
                    outlineOffset: '2px',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl py-2 text-sm transition-colors"
              style={{ backgroundColor: '#f0e4da', color: '#8b5e4b' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl py-2 text-sm font-medium transition-colors"
              style={{ backgroundColor: '#c8765a', color: '#fff' }}
            >
              {event ? 'Save Changes' : 'Add Memory'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
