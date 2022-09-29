export function convertDurationToTimeString(duration: number) {
  const hours = Math.floor(duration / 3600)
  const minutes = Math.floor(duration % 3600 / 60)
  const seconds = duration % 60


  const timerString = [hours, minutes, seconds].map(unit => String(unit).padStart(2, '0')).join(':')

  return timerString
}