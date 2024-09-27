'use strict';

const emphasize = require('emphasize');
const chalk = require('chalk');

const sheet = (chalkInstance) => ({
  comment: chalkInstance.gray,
  quote: chalkInstance.gray,

  keyword: chalkInstance.cyan,
  addition: chalkInstance.cyan,

  number: chalkInstance.yellow,
  string: chalkInstance.green,
  'meta meta-string': chalkInstance.cyan,
  literal: chalkInstance.yellow,
  doctag: chalkInstance.cyan,
  regexp: chalkInstance.red,

  attribute: chalkInstance.yellow,
  attr: chalkInstance.yellow,
  variable: chalkInstance.yellow,
  'template-variable': chalkInstance.yellow,
  'class title': chalkInstance.yellow,
  'function title': chalkInstance.yellow,
  type: chalkInstance.yellow,

  symbol: chalkInstance.green,
  bullet: chalkInstance.magenta,
  subst: chalkInstance.magenta,
  meta: chalkInstance.magenta,
  'meta keyword': chalkInstance.magenta,
  link: chalkInstance.magenta,

  built_in: chalkInstance.cyan,
  deletion: chalkInstance.red,

  emphasis: chalkInstance.italic,
  strong: chalkInstance.bold,
  formula: chalkInstance.inverse
});

module.exports = (stream) => {
  let level = 0;
  if (stream.isTTY) {
    if (stream.getColorDepth() >= 4) level = 1;
    if (stream.getColorDepth() >= 8) level = 2;
    if (stream.getColorDepth() >= 24) level = 3;
  }
  const chalkInstance = new chalk.Instance({ level });
  const colorSheet = sheet(chalkInstance);
  const highlight = (s) => emphasize.highlight('js', s, colorSheet).value;
  highlight.colorizeMatchingBracket = (s) => chalkInstance.bgBlue(s);
  return highlight;
};
