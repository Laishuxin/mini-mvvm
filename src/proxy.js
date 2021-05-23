/**
 * 实现代理操作
 * @param {Object} target
 * @param {Object} source
 * @param {*} key
 */
export function proxy(target, source, key) {
  Object.defineProperty(target, key, {
    configurable: false,
    enumerable: true,
    get() {
      return source[key]
    },

    set(newValue) {
      source[key] = newValue
    }
  })
}
