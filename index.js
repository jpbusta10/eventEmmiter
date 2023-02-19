class EventEmitter {
  constructor() {
    this.events = {};
  }

  emit(eventName, ...args) {
    const listeners = this.events[eventName];
    if (listeners) {
      for (const listener of listeners) {
        listener(...args);
      }
    }
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  prependListener(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].unshift(listener);
  }

  removeListener(eventName, listener) {
    const listeners = this.events[eventName];
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }
}
const emitter = new EventEmitter();

const listener1 = (message) => console.log(`Listener 1 received message: ${message}`);
const listener2 = (message) => console.log(`Listener 2 received message: ${message}`);
const listener3 = (message) => console.log(`Listener 3 received message: ${message}`);

emitter.on('message', listener1);
emitter.prependListener('message', listener2);
emitter.on('message', listener3);

emitter.emit('message', 'hola');

emitter.removeListener('message', listener1);

emitter.emit('message', 'chau');

