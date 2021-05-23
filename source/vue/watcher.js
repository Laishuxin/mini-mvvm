import { Dep } from './dep'
import { isFunction } from './helpers/utils'

let uuid = 0
export class Watcher {
  /**
   * 观察者
   * @param {string} expr expression
   * @param {Object} scope
   * @param {Function | undefined} cb callback
   */
  constructor(expr, scope, cb) {
    this.expr = expr
    this.scope = scope
    this.cb = cb
    this.uuid = uuid++
    this.update()
  }

  /**
   * 根据表达式获取相应的数据。
   */
  get() {
    // const expr = this.expr
    Dep.target = this
    const newValue = Watcher.compute(this.expr, this.scope)
    Dep.target = null
    return newValue
  }

  update() {
    let newValue = this.get()
    if (isFunction(this.cb)) {
      this.cb(newValue)
    }
    // console.log(newValue)
  }

  /**
   * 计算表达式。
   * @param {string} expr expression
   * @param { Object } scope 作用域。
   * @returns {*}
   */
  static compute(expr, scope) {
    try {
      const func = new Function('scope', 'with(scope){return ' + expr + '}')
      return func(scope)
    } catch (e) {
      console.error('watcher: ', e)
    }
  }
}

/**
 * 观察者
 * @param {string} expr expression
 * @param {Object} scope
 * @param {Function | undefined} cb callback
 * @return { Watcher } 观察者
 */
export function watch(expr, scope, cb) {
  return new Watcher(expr, scope, cb)
}
