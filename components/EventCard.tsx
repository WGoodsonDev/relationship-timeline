'use client'

import { formatDate } from '@/lib/constants'
import type { TimelineEvent } from '@/lib/types'

interface Props {
  event: TimelineEvent
  side: 'left' | 'right'
  onEdit: (event: TimelineEvent) => void
  onDelete: (id: string) => void
}

export default function EventCard({ event, side, onEdit, onDelete }: Props) {
  const isLeft = side === 'left'

  return (
    <div className={`flex items-center gap-0 w-full ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Card */}
      <div className={`w-5/12 ${isLeft ? 'text-right pr-6' : 'text-left pl-6'}`}>
        <div
          className="inline-block rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow"
          style={{ backgroundColor: '#fff8f0', border: `2px solid ${event.color}20` }}
        >
          {/* Header */}
          <div className={`flex items-center gap-2 mb-1 ${isLeft ? 'justify-end' : 'justify-start'}`}>
            <span className="text-xl">{event.emoji}</span>
            <h3
              className="font-semibold text-base leading-tight"
              style={{ color: '#4a2f1f', fontFamily: 'Georgia, serif' }}
            >
              {event.title}
            </h3>
          </div>

          <p className="text-xs mb-2" style={{ color: '#b89a88' }}>
            {formatDate(event.date)}
          </p>

          {event.description && (
            <p className="text-sm leading-relaxed mb-3" style={{ color: '#7a5c4a', fontFamily: 'Georgia, serif' }}>
              {event.description}
            </p>
          )}

          {/* Actions */}
          <div className={`flex gap-2 ${isLeft ? 'justify-end' : 'justify-start'}`}>
            <button
              onClick={() => onEdit(event)}
              className="text-xs px-2 py-1 rounded-lg transition-colors"
              style={{ color: '#c8765a', backgroundColor: '#fdecd9' }}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(event.id)}
              className="text-xs px-2 py-1 rounded-lg transition-colors"
              style={{ color: '#a0522d', backgroundColor: '#f5e0d5' }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Center dot */}
      <div className="w-2/12 flex justify-center">
        <div
          className="w-4 h-4 rounded-full border-2 border-white shadow-md z-10"
          style={{ backgroundColor: event.color }}
        />
      </div>

      {/* Spacer */}
      <div className="w-5/12" />
    </div>
  )
}
