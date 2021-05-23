import { watch } from './watcher'
const DIRECTIVE_PREFIX = 'v-'

const directiveHandler = {
  text: handleTextDirective,
  model: handleModelDirective
}

/**
 *判断属性名是否可以编译为指令。
 * @param {string} attrName
 * @return {boolean} True if is directive.
 */
export function isDirective(attrName) {
  if (!attrName.startsWith(DIRECTIVE_PREFIX)) {
    return false
  }
  return directiveHandler[attrName.slice(2)] !== undefined
}

/**
 * 获取指令处理函数。
 * @param {string} attrName 指令名。不含v-。
 * @returns { Function } 指令处理函数。
 */
export function getDirectiveHandler(attrName) {
  return directiveHandler[attrName]
}

/**
 * 处理 v-text指令。
 * @param {*} context 执行上下文。
 * @param {HTMLElement} node
 * @param {string} attrValue 属性值
 */
function handleTextDirective(context, node, attrValue) {
  watch(attrValue, context, (newValue) => {
    node.textContent = newValue
  })
}

/**
 * 处理 v-model指令。
 * @param {*} context 执行上下文。
 * @param {HTMLInputElement} node
 * @param {string} attrValue 属性值
 */
function handleModelDirective(context, node, attrValue) {
  watch(attrValue, context, (newValue) => {
    node.value = newValue
  })
  node.addEventListener('input', (event) => {
    context[attrValue] = event.target.value
  })
}
