export const formatDateTime = (value) => {
  const splitDateTime = value.split('T')

  const date = splitDateTime[0]

  const time = splitDateTime[1].split('.')[0]

  return date + ' at ' + time
}
