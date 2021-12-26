/**
 * @description: 清除缓存
 * @param {*} key
 * @return {*}
 */
export function clearToken(key) {
  if (key) {
    sessionStorage.removeItem(key)
    return
  }
  sessionStorage.clear()
}
/**
 * @description: 获取缓存
 * @param {*} key
 * @return {*}
 */
export function getSession(key = 'token') {
  return sessionStorage.getItem(key)
}
/**
 * @description: 设置缓存
 * @param {*} key
 * @return {*}
 */
export function setSession(key, value) {
  return sessionStorage.setItem(key, value)
}
