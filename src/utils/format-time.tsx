export const timeFormatter = new Intl.RelativeTimeFormat('en-US', {})

export const formatTime = (time: number) => {
  const now = Date.now() / 1000
  const timeDate = new Date(time).getTime()

  const diff = now - timeDate

  if (diff < 60) {
    return timeFormatter.format(Math.round(diff), 'seconds')
  }

  if (diff < 3600) {
    return timeFormatter.format(Math.round(diff / 60), 'minutes')
  }

  if (diff < 86400) {
    return timeFormatter.format(Math.round(diff / 3600), 'hours')
  }

  return timeFormatter.format(Math.round(diff / 86400), 'days')
}
