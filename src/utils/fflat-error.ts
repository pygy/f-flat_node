import { formatState } from './pprint';
import { StackEnv } from '../env';

export class FFlatError extends Error {
  constructor(message = 'FFlatError', state: StackEnv | { stack, queue } = { stack: [], queue: [] }) {
    super(message);

    // extending Error is weird and does not propagate `message`
    Reflect.defineProperty(this, 'message', {
      enumerable: false,
      value: message
    });

    Reflect.defineProperty(this, 'name', {
      enumerable: false,
      value: 'FFlatError'
    });

    Reflect.defineProperty(this, 'stack', {
      enumerable: false,
      value: `${this.name}: ${this.message}
    stack/queue: ${state.stack.length} / ${state.queue.length}
    state:    ${formatState(state)}
`
    });
  }
}
