// 防抖
export function debounce(fn, delay = 1000) {
  let timer = null

  return function (...args) {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(this, args)
      clearTimeout(timer)
    }, delay)
  }
}

// 节流函数
export function throttle(fn, delay = 1000) {
  let timer = null
  let status = false

  return function (...args) {
    if (status) return
    status = true
    timer = setTimeout(() => {
      fn.apply(this, args)
      status = false
      clearTimeout(timer)
    }, delay)
  }
}
/**
 * 键值对转换成查询字符串
 * @param {object} query 键值对，对象
 * @returns {string} 查询参数字符串
 */
export function stringify(query) {
  const array = []
  for (const key in query) {
    if (Object.prototype.hasOwnProperty.call(query, key)) {
      array.push([key, encodeURIComponent(query[key])].join('='))
    }
  }
  return array.join('&')
}

/**
 * 过滤对象中空值 null 或者 undefined 或者 空数组
 */
export function filterParams(obj) {
  for (const propName in obj) {
    if (['', null, undefined].includes(obj[propName]) || JSON.stringify(obj[propName]) === '[]') {
      delete obj[propName]
    }
  }
  return obj
}

export function getImageUrl(name, suffix = 'png') {
  return new URL(`../assets/img/${name}.${suffix}`, import.meta.url).href
}

export function awaitWraper(promise) {
  return promise.then((res) => [null, res]).catch((err) => [err, null])
}
