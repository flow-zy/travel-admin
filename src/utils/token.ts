const TOKEN_KEY='admin_token'
export const getToken = (): string => {
  return localStorage.getItem(TOKEN_KEY) ?? ''
}

export const setToken = (token: string): void => { 
  localStorage.setItem(TOKEN_KEY, token)
}
export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}