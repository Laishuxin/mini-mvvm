import { isPlainObject } from './helpers/utils'
import { Dep } from './dep'
export function observe(data) {
  if (typeof data === 'undefined' || !isPlainObject(data)) {
    return
  }
  return new Observer(data)
}

export class Observer {
  constructor(data) {
    this.data = data
    this.walk(this.data)
  }

  /**
   * 深度遍历对象，并将其设置为响应式。
   * @param {Object} data.
   * Examples
   * {
   *   msg: 'hello vue',
   *   person: {
   *     name: 'Foo',
   *     age: 18
   *   },
   *   arr: [1, 2, 3]
   * }
   */
  walk(data) {
    const keys = Object.keys(data)
    keys.forEach((key) => {
      defineReactive(data, key, data[key])
    })
  }
}

/**
 * 将对象设置为响应式。
 * @param {Object} data
 * @param {*} key
 * @param {*} value
 */
export function defineReactive(data, key, value) {
  const dep = new Dep()
  // value 可能是一个对象
  observe(value)
  // TODO(rushui 2021-05-16): 重写数组方法
  Object.defineProperty(data, key, {
    configurable: false,
    enumerable: true,
    get() {
      dep.addSubscriber(Dep.target)
      return value
    },
    set(newValue) {
      // console.log('observer: key = ', key)
      if (value === newValue) {
        return
      }
      value = newValue
      // newValue 可能是一个对象
      observe(newValue)
      dep.notifySubscribers()
    }
  })
}
