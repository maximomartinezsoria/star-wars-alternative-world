class EventEmitter {
  constructor() {
    this.callbacks = {}
  }

  on(event, cb) {
    if (!this.callbacks[event]) this.callbacks[event] = []
    this.callbacks[event].push(cb)
  }

  emit(event, data) {
    let cbs = this.callbacks[event]
    if (cbs) {
      cbs.forEach((cb) => cb(data))
    }
  }
}

const eventEmitter = new EventEmitter()

const Emitter = {
  on: (event, fn) => eventEmitter.on(event, fn),
  emit: (event, payload) => eventEmitter.emit(event, payload),
}

Object.freeze(Emitter)

export default Emitter
