import Vue from '.'
import { watch } from './watcher'
import { getDirectiveHandler, isDirective } from './directives'
import { getEventHandler, isEvent } from './events'

/**
 * 执行编译操作。
 * @param {Vue} context
 * @returns {Compiler} 编译器
 */
export function compile(context) {
  return new Compiler(context)
}

export class Compiler {
  /**
   * 实现编译。
   * @param { Vue } context 执行上下文。
   */
  constructor(context) {
    this.el = context.$el
    this.context = context
    this.fragment = this.nodeToFragment(this.el)
    this.compile(this.fragment)

    this.fragment && this.el.appendChild(this.fragment)
  }

  /**
   * 将 HTMLElement 结点转换成 DocumentFragment
   * @param {HTMLElement} el 结点。
   * @returns { DocumentFragment | null }
   */
  nodeToFragment(el) {
    if (!el instanceof HTMLElement) {
      return null
    }
    const fragment = document.createDocumentFragment()

    let firstChild
    while ((firstChild = el.firstChild)) {
      fragment.appendChild(firstChild)
    }
    return fragment
  }

  /**
   * 判断结点是否可以忽略
   * @param { HTMLElement } node
   */
  ignorable(node) {
    const nodeType = node.nodeType
    return (
      nodeType === Node.COMMENT_NODE ||
      (nodeType === Node.TEXT_NODE && node.textContent.trim() === '')
    )
  }

  /**
   *
   * @param { HTMLElement | DocumentFragment } node
   */
  compile(node) {
    // 改成策略模式
    node.childNodes.forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        this.compileElementNode(child)
      } else if (child.nodeType === Node.TEXT_NODE) {
        this.compileTextNode(child)
      }
    })
  }

  /**
   * 编译文本结点
   * @param { HTMLElement } node
   */
  compileTextNode(node) {
    const expr = this.parseTextToExp(node.textContent)
    if (expr) {
      watch(expr, this.context, (newValue) => {
        node.textContent = newValue
      })
    }
  }

  /**
   * 编译元素结点
   * @param {HTMLElement} node
   */
  compileElementNode(node) {
    const attrs = node.attributes
    if (attrs.length) {
      ;[...attrs].forEach((attr) => {
        const attrName = attr.name
        const attrValue = attr.value
        if (isDirective(attrName)) {
          this._handleDirective(this.context, node, attrName, attrValue)
        }
        if (isEvent(attrName)) {
          this._handleEvent(this.context, node, attrName, attrValue)
        }
      })
    }
    // this.compileTextNode(node)
    // if (node.childNodes) {
    //   ;[...node.childNodes].forEach((child) => {
    //     this.compile(child)
    //   })
    // }
    this.compile(node)
  }

  static beardRegex = /\{\{(.*?)\}\}/g
  /**
   * 将文本转换为表达式。
   * @param {string} text 文本
   * @example
   * ---{{ msg + '---' }}+++
   * `'---' + msg + '---' + '+++'`
   * @returns { string | null } return expression if success else null
   */
  parseTextToExp(text) {
    const pieces = text.split(Compiler.beardRegex)
    /** @type{ string[] } */
    const tokens = []

    const match = text.match(Compiler.beardRegex)
    if (!match) {
      return null
    }

    pieces.forEach((piece) => {
      if (match.includes('{{' + piece + '}}')) {
        tokens.push('(' + piece + ')')
      } else {
        tokens.push(`"${piece}"`)
      }
    })

    return tokens.join('+')
  }

  /**
   * 处理指j令
   * @param {*} scope 作用域
   * @param {HTMLElement} node 元素结点
   * @param {string} attrName 属性名。v-开头
   * @param {string} attrValue 属性值。
   */
  _handleDirective(scope, node, attrName, attrValue) {
    const handler = getDirectiveHandler(attrName.slice(2))
    handler(scope, node, attrValue)
  }

  /**
   * 处理指j令
   * @param {*} scope 作用域
   * @param {HTMLElement} node 元素结点
   * @param {string} attrName 属性名。v-开头
   * @param {string} attrValue 属性值。
   */
  _handleEvent(scope, node, attrName, attrValue) {
    const handler = getEventHandler()
    handler(scope, node, attrName.slice(1), attrValue)
  }
}
