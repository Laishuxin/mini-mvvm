import { isString } from './utils'

/**
 * 获取 HTMLElement
 * @param { HTMLElement | string } el
 * @returns { HTMLElement }
 */
export function getHTMLElement(el) {
  if (el instanceof HTMLElement) {
    return el
  } else if (isString(el)) {
    return document.querySelector(el)
  }
  throw new Error('HTML error: fail to get HTMLElement')
}
