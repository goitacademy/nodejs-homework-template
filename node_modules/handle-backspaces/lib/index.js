"use strict";
function handleBackspaces(input) {
    while (true) {
        const bs1Index = input.indexOf('\u007f');
        const bs2Index = input.indexOf('\u0008');
        let backspaceIndex = -1;
        if (bs1Index !== -1) {
            backspaceIndex = bs1Index;
        }
        if (bs2Index !== -1 && (backspaceIndex === -1 || bs2Index < backspaceIndex)) {
            backspaceIndex = bs2Index;
        }
        if (backspaceIndex === -1)
            break;
        if (backspaceIndex === 0) {
            input = input.slice(1);
            continue;
        }
        if (typeof input === 'string') {
            input = input.slice(0, backspaceIndex).replace(/.$/u, '') + input.slice(backspaceIndex + 1);
        }
        else {
            let i;
            for (i = backspaceIndex - 1; i >= backspaceIndex - 6; i--) {
                if (input[i] <= 0x7f || input[i] >= 0xc0) {
                    break;
                }
            }
            input = Buffer.concat([input.slice(0, i), input.slice(backspaceIndex + 1)]);
        }
    }
    return input;
}
module.exports = handleBackspaces;
//# sourceMappingURL=index.js.map