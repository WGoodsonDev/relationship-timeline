export const PALETTE = [
  '#c8765a', // terracotta
  '#e8a87c', // peach
  '#8b7355', // warm brown
  '#6b8e6b', // sage green
  '#7a9abf', // dusty blue
  '#b07fc4', // lavender
  '#c4907f', // blush
  '#9b8ea8', // mauve
]

export const EMOJI_OPTIONS = [
  '✨', '💕', '🌹', '🎉', '🌟', '💫', '🥂', '🌙',
  '☀️', '🌊', '🍂', '❄️', '🌸', '🦋', '💌', '🎵',
  '🏡', '✈️', '🌍', '🎂', '💍', '🤝', '👫', '🌅',
]

export function formatDate(dateStr: string): string {
  // dateStr is "YYYY-MM-DD"; parse in local time to avoid timezone shifts
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
