import erf from 'compute-erf';

import {typed, BigNumber, pi, Complex, Action} from '../types/index';
import {lexer} from '../lexer';

// const pow = lexer('ln * exp');

export default {
  'number': x => new BigNumber(x),
  'number?': typed('number_', {
    'BigNumber | Complex | number': () => true,
    'any': () => false
  }),
  're': typed('re', {
    'BigNumber | number': (a) => a,
    'Complex': (a) => a.re
  }),
  'im': typed('im', {
    'BigNumber | number': (a) => 0,
    'Complex': (a) => a.im
  }),
  'complex?': typed('complex_', {
    'Complex': (a) => !a.im.isZero(),
    'BigNumber | number | any': () => false
  }),
  '%': typed('mod', { 'BigNumber | Complex, BigNumber | number': (lhs, rhs) => lhs.modulo(rhs) }),
  abs: typed('abs', { 'BigNumber | Complex': a => a.abs() }),
  cos: a => BigNumber.cos(a),
  sin: a => BigNumber.sin(a),
  tan: a => BigNumber.tan(a),
  acos: a => BigNumber.acos(a),
  asin: a => BigNumber.asin(a),
  atan: a => BigNumber.atan(a),
  atan2: a => BigNumber.atan2(a),
  round: typed('round', {
    'BigNumber | Complex': a => a.round()
  }),
  floor: typed('floor', {
    'BigNumber | Complex': a => a.floor()
  }),
  ceil: typed('ceil', {
    'BigNumber | Complex': a => a.ceil()
  }),
  sqrt: typed('sqrt', {
    'Complex': function (x) {
      return x.sqrt();
    },
    'BigNumber': function (x) {
      return (x.isNegative()) ? new Complex(x, 0).sqrt() : x.sqrt();
    }
  }),
  max: (a, b, ...c) => BigNumber.max(a, b, ...c),
  min: (a, b, ...c) => BigNumber.min(a, b, ...c),
  exp: typed('exp', {
    'BigNumber | Complex': x => x.exp()
  }),
  gamma: typed('gamma', {
    'BigNumber | Complex': a => a.gamma()
  }),
  nemes: typed('nemes', {
    'BigNumber': a => a.nemesClosed()
  }),
  spouge: typed('nemes', {
    'BigNumber': a => a.spouge()
  }),
  erf,  // todo: big
  ln: typed('ln', {
    'BigNumber | Complex': a => a.ln()
  }),
  '^': typed('pow', {  // boolean or?
    'Complex, BigNumber | Complex | number': (a, b) => Action.of([b, a].concat(lexer('ln * exp'))),
    'BigNumber, BigNumber | Complex | number': (a, b) => a.pow(b)
  }),
  // '^': 'swap ln * exp',
  'rand': Math.random,
  'pi': pi
};