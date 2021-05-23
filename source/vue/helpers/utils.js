/**
 * @param {*} value
 * @returns value is Function
 */
export function isFunction(value) {
  return typeof value === 'function'
}

/**
 * @param {*} value
 * @returns value is a plain Object
 */
export function isPlainObject(value) {
  return value != null && typeof value === 'object'
}

/**
 * @param {*} value
 * @returns value is string
 */
export function isString(value) {
  return typeof value === 'string'
}

const spacesRegex = /^\s+$/
/**
 * 判断是否全为空格（\n\t\r）。
 * @param {string} value
 */
export function isSpace(value) {
}
