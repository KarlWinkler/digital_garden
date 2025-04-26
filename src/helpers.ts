export const getFutureTime = (timeToAdd: number) => {
  const now = new Date()

  return now.setTime(now.getTime() + timeToAdd)
}

export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(';')
  let found = null

  cookies.forEach((cookie) => {
    if (cookie.trim().startsWith(name)) {
      found = cookie.split('=')[1]
    }
  })

  return found
}
