import { isFunction } from "./helpers/utils"

const EVENT_PREFIX = '@'
// TODO(rushui 2021-05-21): fill it.

/**
 * 判断是否为事件。
 * @param {string} attrName
 * @returns {boolean}
 */
export function isEvent(attrName) {
  if (!attrName.startsWith(EVENT_PREFIX)) {
    return false
  }
  return true
}

// TODO(rushui 2021-05-21): fill it.
/**
 * 根据配置获取事件处理函数
 * @param {Object} options
 * @returns { Function }
 */
export function getEventHandler(options) {
  return eventHandler
}

/**
 * 事件处理。
 * @param {*} context
 * @param {HTMLElement} node
 * @param {string} eventName
 * @param {string} attrValue
 */
function eventHandler(context, node, eventName, attrValue) {
  console.log(attrValue)
  const method = context[attrValue]
  if (method && isFunction(method)) {
    node.addEventListener(eventName, (event) => {
      method.call(context, event)
    })
  }
}
