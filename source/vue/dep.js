import { Watcher } from './watcher'

export class Dep {
  /** @type{ Watcher } */
  static target

  constructor() {
    /** @type{Map<number, Watcher>} */
    this.subscribers = new Map()
  }

  /**
   * 添加观察者。
   * @param { Watcher } subscriber
   */
  addSubscriber(subscriber) {
    if (!subscriber) { return }
    this.subscribers.set(subscriber.uuid, subscriber)
  }

  /**
   * 通知观察者。
   */
  notifySubscribers() {
    this.subscribers.forEach((watcher) => {
      watcher.update()
    })
  }
}
