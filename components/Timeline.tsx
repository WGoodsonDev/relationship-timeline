'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import EventCard from './EventCard'
import EventModal from './EventModal'
import type { TimelineEvent, EventFormData } from '@/lib/types'

export default function Timeline() {
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<TimelineEvent | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadEvents = useCallback(async () => {
    const res = await fetch('/api/events')
    if (!res.ok) { setError('Failed to load events'); return }
    const data: TimelineEvent[] = await res.json()
    setEvents(data)
    setLoading(false)
  }, [])

  useEffect(() => { loadEvents() }, [loadEvents])

  function openAdd() { setEditing(null); setModalOpen(true) }
  function openEdit(event: TimelineEvent) { setEditing(event); setModalOpen(true) }
  function closeModal() { setModalOpen(false); setEditing(null) }

  async function handleSave(form: EventFormData) {
    if (editing) {
      // Optimistic update
      setEvents((prev) =>
        prev.map((e) => (e.id === editing.id ? { ...editing, ...form } : e))
          .sort((a, b) => a.date.localeCompare(b.date))
      )
      closeModal()
      await fetch(`/api/events/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } else {
      closeModal()
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        const newEvent: TimelineEvent = await res.json()
        setEvents((prev) =>
          [...prev, newEvent].sort((a, b) => a.date.localeCompare(b.date))
        )
      }
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Remove this memory?')) return
    setEvents((prev) => prev.filter((e) => e.id !== id))
    await fetch(`/api/events/${id}`, { method: 'DELETE' })
  }

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#fef8ef' }}>
        <p style={{ color: '#c8765a', fontFamily: 'Georgia, serif' }}>Loading your memories...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-12" style={{ backgroundColor: '#fef8ef' }}>
      {/* Header */}
      <div className="text-center mb-12 relative">
        <button
          onClick={handleSignOut}
          className="absolute right-0 top-0 text-xs px-3 py-1 rounded-lg"
          style={{ color: '#c8765a', backgroundColor: '#fdecd9' }}
        >
          Sign out
        </button>
        <h1
          className="text-4xl md:text-5xl font-bold mb-3"
          style={{ color: '#6b4c3b', fontFamily: 'Georgia, serif' }}
        >
          Our Story
        </h1>
        <p className="text-base" style={{ color: '#b89a88', fontFamily: 'Georgia, serif' }}>
          Every moment, collected
        </p>
      </div>

      {/* Add button */}
      <div className="text-center mb-10">
        <button
          onClick={openAdd}
          className="px-6 py-3 rounded-2xl text-white font-medium shadow-md hover:shadow-lg transition-all"
          style={{ backgroundColor: '#c8765a', fontFamily: 'Georgia, serif' }}
        >
          + Add a Memory
        </button>
      </div>

      {error && (
        <p className="text-center text-sm mb-8" style={{ color: '#c0392b' }}>{error}</p>
      )}

      {/* Timeline */}
      {events.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">💕</p>
          <p style={{ color: '#b89a88', fontFamily: 'Georgia, serif' }}>
            Your story starts here. Add your first memory.
          </p>
        </div>
      ) : (
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
            style={{ backgroundColor: '#e8c9b0' }}
          />

          <div className="space-y-10">
            {events.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                side={index % 2 === 0 ? 'left' : 'right'}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}

      {modalOpen && (
        <EventModal event={editing} onSave={handleSave} onClose={closeModal} />
      )}
    </div>
  )
}
