export const formatDateTime = (value) => {
  const splitDateTime = value.split('T')

  const date = splitDateTime[0]

  const time = splitDateTime[1].split('.')[0]

  return date + ' at ' + time
}

export function debounce(func, delay) {
  let timerId
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function buildFolderHistory(folder) {
  if (!folder.parent) {
    return [{ id: folder.id, name: folder.name }] // Base case: no parent folder
  }

  const parentPath = buildFolderHistory(folder.parent) // Add current folder name to the array

  const combined = Array.from(parentPath)
  combined.push({ id: folder.id, name: folder.name })

  return combined
}
