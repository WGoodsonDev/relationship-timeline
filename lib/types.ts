export interface TimelineEvent {
  id: string
  date: string // "YYYY-MM-DD"
  title: string
  description?: string
  emoji: string
  color: string
  created_at?: string
  updated_at?: string
}

export type EventFormData = Omit<TimelineEvent, 'id' | 'created_at' | 'updated_at'>
