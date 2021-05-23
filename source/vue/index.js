import { getHTMLElement } from './helpers/html'
import { isFunction, isPlainObject } from './helpers/utils'
import { Compiler } from './compiler'
import { observe } from './observer'
import { proxy } from '../../src/proxy'

export default class Vue {
  /**
   * @param {Object} options 配置项
   */
  constructor(options) {
    let data = options.data

    this.$options = options || {}
    this.$el = getHTMLElement(options.el)
    // 获取数据并初始化
    data = isFunction(data) ? data.apply(this) : data || {}
    this._data = this.$data = data
    this._methods = options.methods || {}

    this._proxyData()
    this._proxyMethods()

    // 数据劫持
    observe(this._data)

    // 编译
    new Compiler(this)
  }

  /** 实现数据代理。vm[someProp] = vm._data[someProp] */
  _proxyData() {
    const keys = Object.keys(this._data)
    keys.forEach((key) => {
      proxy(this, this._data, key)
    })
  }

  /** 实现函数代理。vm[someMethod] = vm._data[someMethod] */
  _proxyMethods() {
    const methods = this._methods
    if (isPlainObject(methods)) {
      const keys = Object.keys(methods)
      keys.forEach((key) => {
        proxy(this, this._methods, key)
      })
    }
  }
}
