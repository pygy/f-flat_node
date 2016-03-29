import {typed, Action, Just} from '../types/index';

export default {
  'types': typed.types,
  'type': typed('string', {
    Array: x => 'array',
    any: x => typeof x
  }),
  'string': typed('string', {
    Array: String,
    any: String
  }),
  'itoa': x => String.fromCharCode(x),
  'atoi': x => x.charCodeAt(0),
  'atob': x => new Buffer(x, 'base64').toString('binary'),
  'btoa': x => new Buffer(x, 'binary').toString('base64'),
  'boolean': Boolean,
  'atom': a => Just.of(Action.of(a)),
  'array': n => new Array(n),
  'integer': a => a | 0,
  'null': () => null,
  'null?': 'null =',
  'nan': NaN,
  'string?': 'type "string" =',
  'boolean?': 'type "boolean" =',
  'of': (a, b) => (a.constructor) ? new a.constructor(b) : undefined,
  'empty': a => (a.empty) ? a.empty() : new a.constructor(),
  'is': (a, b) => a === b
};
