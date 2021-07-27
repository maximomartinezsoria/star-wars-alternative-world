export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function getCookie(name) {
  return document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`)?.pop() || ''
}

export function setCookie(name, value) {
  document.cookie = `${name}=${value}`
}

export function removeCookie(name) {
  document.cookie = `${name}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`
}
