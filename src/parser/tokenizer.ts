// Reference the Myna module
import { Myna } from 'myna-parser';

// Construct a grammar object
const g = Object.create(null);

const DELIMITER = ' \t\n\r\f,';
const BRACKETS = '[]{}()';
const QUOTES = '\'"`';
const COLON = ':';

// words
g.bracket = Myna.char(BRACKETS).ast;
g.identifierFirst = Myna.notChar(DELIMITER + QUOTES + BRACKETS);
g.identifierNext = Myna.notChar(DELIMITER + QUOTES + BRACKETS + COLON);
g.identifier = Myna.seq(
  g.identifierFirst,
  g.identifierNext.zeroOrMore,
  Myna.char(COLON).opt
);
g.word = g.identifier.copy.ast;

g.digit = Myna.choice(Myna.digit, Myna.char('_'));

g.digits = g.digit.oneOrMore;

// decimal
g.integer = Myna.seq(Myna.digit.oneOrMore, g.digit.zeroOrMore);
g.fraction = Myna.seq('.', g.integer);
g.plusOrMinus = Myna.char('+-');
g.exponent = Myna.seq(Myna.char('eE'), g.plusOrMinus.opt, g.digits);
g.decimal = Myna.seq(
  g.plusOrMinus.opt,
  g.integer,
  g.fraction.opt,
  g.exponent.opt,
  Myna.char('%').opt
).thenNot(g.identifierNext.or(Myna.digit));
g.decimalFraction = Myna.seq(
  g.plusOrMinus.opt,
  g.integer.opt,
  g.fraction,
  g.exponent.opt,
  Myna.char('%').opt
).thenNot(g.identifierNext.or(Myna.digit));

// radix
g.rawRadixDigit = Myna.char('0123456789abcdefABCDEF');
g.radixDigit = Myna.choice(g.rawRadixDigit, Myna.char('_'));
g.radixInteger = Myna.seq(g.rawRadixDigit.oneOrMore, g.radixDigit.zeroOrMore);
g.radixFraction = Myna.seq('.', g.radixInteger);
g.radixExponent = Myna.seq(
  Myna.char('eEpP'),
  g.plusOrMinus.opt,
  g.radixDigit.oneOrMore
);
g.radix = Myna.seq(
  g.plusOrMinus.opt,
  '0',
  Myna.char('oObBxF'),
  g.radixInteger,
  g.radixFraction.opt,
  g.radixExponent.opt
).thenNot(g.identifierNext.or(g.radixDigit));

g.number = Myna.choice(g.radix, g.decimal, g.decimalFraction, g.integer).ast;

// Comments and whitespace
g.untilEol = Myna.advanceWhileNot(Myna.newLine).then(Myna.newLine.opt);
g.fullComment = Myna.seq('/*', Myna.advanceUntilPast('*/'));
g.lineComment = Myna.seq('//', g.untilEol);
g.comment = g.fullComment.or(g.lineComment);
g.delimiter = Myna.char(DELIMITER).oneOrMore;
g.ws = g.delimiter.or(Myna.atWs.then(Myna.advance)).zeroOrMore;

// symbol
g.symbol = Myna.seq(Myna.char('#'), g.identifier).ast;

// literals
g.bool = Myna.choice(
  Myna.keywordAnyCase('true'),
  Myna.keywordAnyCase('false')
).thenNot(g.identifierNext).ast;
g.null = Myna.keywordAnyCase('null').thenNot(g.identifierNext).ast;
g.nan = Myna.keywordAnyCase('nan').thenNot(g.identifierNext).ast;
g.i = Myna.keywordAnyCase('i').thenNot(g.identifierNext).ast;

g.literal = Myna.choice(g.bool, g.null, g.nan, g.i);

// strings
g.escapedChar = Myna.char('\\').then(Myna.advance);
g.templateString = Myna.guardedSeq('`', Myna.notChar('`').zeroOrMore, '`').ast;
g.singleQuotedString = Myna.guardedSeq(
  `'`,
  Myna.notChar(`'`).zeroOrMore,
  `'`
).ast;
g.doubleQuotedString = Myna.guardedSeq(
  '"',
  Myna.notChar('"').zeroOrMore,
  '"'
).ast;
g.string = Myna.choice(
  g.templateString,
  g.singleQuotedString,
  g.doubleQuotedString
);

g.value = Myna.choice(
  g.comment,
  g.number,
  g.symbol,
  g.literal,
  g.word,
  g.string,
  g.bracket
);

g.sequence = g.value.delimited(g.ws);

Myna.registerGrammar('fflat', g, g.value);

exports.fflatGrammar = Myna.grammars['fflat'];

// Get the parser
export const parser = function(text) {
  return Myna.parse(g.sequence, text);
};

export const tokenize = function(text) {
  const result = Myna.parse(g.sequence, text);
  return result ? result.children : [];
};
