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

export function colorMix(color1, color2, weight) {
  weight = Math.max(Math.min(Number(weight), 1), 0)
  const r1 = parseInt(color1.substring(1, 3), 16)
  const g1 = parseInt(color1.substring(3, 5), 16)
  const b1 = parseInt(color1.substring(5, 7), 16)
  const r2 = parseInt(color2.substring(1, 3), 16)
  const g2 = parseInt(color2.substring(3, 5), 16)
  const b2 = parseInt(color2.substring(5, 7), 16)
  let r = String(Math.round(r1 * (1 - weight) + r2 * weight))
  let g = String(Math.round(g1 * (1 - weight) + g2 * weight))
  let b = String(Math.round(b1 * (1 - weight) + b2 * weight))
  r = `0${(r || 0).toString(16)}`.slice(-2)
  g = `0${(g || 0).toString(16)}`.slice(-2)
  b = `0${(b || 0).toString(16)}`.slice(-2)
  return `#${r}${g}${b}`
}
