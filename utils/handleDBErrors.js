export const getErr = (err) => {
  const parts = err.split(':')
  return parts[parts.length - 1].trim()
}