'use strict';
// eslint-disable-next-line complexity
module.exports = function(str, ignoreMismatches) {
  // Find all matching brackets inside a string.
  // 'stack' maintains a list of all currently open brackets, 'matches' a list
  // of all closed brackets (i.e. the return value).
  // If `ignoreMismatches` is true, then e.g. {(x} will be ignored entirely.
  // If not, then { and } will be matched and the ( discarded.
  const stack = [];
  const matches = [];
  for (let i = 0; i < str.length; i++) {
    const current = stack.length > 0 ? stack[stack.length - 1] : null;
    const currentKind = current ? current.kind : '';
    // eslint-disable-next-line default-case
    switch (currentKind) {
      case '':
      case '(':
      case '[':
      case '{':
      case '$':
        // eslint-disable-next-line default-case
        switch (str[i]) {
          case '(':
          case '[':
          case '{':
          case "'":
          case '"':
          case '`':
            stack.push({
              start: i,
              end: -1,
              kind: str[i],
              parent: current
            });
            break;
          case ')':
          case ']':
          case '}':
            for (let j = stack.length - 1; j >= 0; j--) {
              const entry = stack[j];
              if ((entry.kind === '(' && str[i] === ')') ||
                  (entry.kind === '[' && str[i] === ']') ||
                  (entry.kind === '{' && str[i] === '}') ||
                  (entry.kind === '$' && str[i] === '}')) {
                const isProperMatch = j === stack.length - 1;
                stack.splice(j); // Unwind the stack in any case.
                if (!ignoreMismatches || isProperMatch) {
                  entry.end = i;
                  matches.push(entry);
                }
                break;
              }
            }
            break;
        }
        break;
      case "'":
      case '"':
      case '`':
        // eslint-disable-next-line default-case
        switch (str[i]) {
          case "'":
          case '"':
          case '`':
          case '$': {
            let j; // Count number of preceding \ characters
            for (j = 0; j < i && str[i - j - 1] === '\\'; j++);
            if (j % 2 === 1) {
              break; // This is an escaped character, so we can ignore it.
            }
            if ((currentKind === "'" && str[i] === "'") ||
                (currentKind === '"' && str[i] === '"') ||
                (currentKind === '`' && str[i] === '`')) {
              const entry = stack.pop();
              entry.end = i;
              matches.push(entry);
            } else if (currentKind === '`' && str[i] === '$' && str[i + 1] === '{') {
              stack.push({
                start: i++,
                end: -1,
                kind: '$',
                parent: current
              });
            }
            break;
          }
        }
        break;
    }
  }
  return matches;
};
