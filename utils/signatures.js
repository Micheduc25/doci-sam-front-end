export const getSHA256Hash = async (fileTextValue) => {
  const textAsBuffer = new TextEncoder().encode(fileTextValue)

  const hashBuffer = await window.crypto.subtle.digest('SHA-256', textAsBuffer)

  const hashArray = Array.from(new Uint8Array(hashBuffer))

  const hash = hashArray
    .map((item) => item.toString(16).padStart(2, '0'))
    .join('')

  return hash
}

export const getSHA256HashFromUrl = async (fileUrl) => {
  try {
    const response = await fetch(fileUrl)
    const blob = await response.blob()

    const text = await blob.text()

    const hash = await getSHA256Hash(text)
    return hash
  } catch (err) {
    console.log(err)
    return null
  }
}
