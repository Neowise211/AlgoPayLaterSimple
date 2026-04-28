/** Format seconds as MM:SS. */
export function formatTime(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds))
  const mins = Math.floor(safe / 60)
    .toString()
    .padStart(2, '0')
  const secs = (safe % 60).toString().padStart(2, '0')
  return `${mins}:${secs}`
}

/** Format a number as Philippine Peso currency. */
export function formatCurrency(amount: number): string {
  const value = Number(amount) || 0
  return '₱' + value.toLocaleString('en-PH')
}

/** Escape HTML entities to prevent XSS in dynamic content. */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Format a signed number with explicit + prefix for positive values. */
export function formatSigned(value: number): string {
  const numeric = Number(value) || 0
  return numeric > 0 ? `+${numeric}` : String(numeric)
}
