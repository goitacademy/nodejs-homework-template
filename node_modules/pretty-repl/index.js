'use strict';

// Functions that return the right implementation
// depending on whether we are using a TTY or not.
// They are functions rather than variables because we
// only want to execute the require if that's the right version to load.
const prettyReplUnsupported = () => require('repl');
const prettyRepl = () => require('./lib/pretty-repl');

const impl = (tty) => !tty ? prettyReplUnsupported() : prettyRepl();

function isReplTerminal(options) {
  if (options.terminal !== undefined) {return options.terminal;}
  return (options.output || process.stdout).isTTY;
}

class REPLServer extends (prettyReplUnsupported().REPLServer) {
  constructor(options = {}) {
    return new (impl(isReplTerminal(options)).REPLServer)(options);
  }
}
function start(options = {}) {
  return impl(isReplTerminal(options)).start(options);
}

module.exports = {
  REPLServer,
  start
};
