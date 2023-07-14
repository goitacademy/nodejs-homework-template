"use strict";
function saveAndRemoveListeners(ee, ...events) {
    const listenerStore = {};
    for (const event of events) {
        listenerStore[event] = ee.rawListeners(event);
        ee.removeAllListeners(event);
    }
    return {
        restore() {
            for (const event of events) {
                for (const listener of listenerStore[event]) {
                    ee.addListener(event, listener);
                }
            }
        }
    };
}
function hijackStream(options) {
    var _a;
    const { stream } = options;
    const isTTY = 'isTTY' in stream && stream.isTTY;
    let wasRaw = false;
    let streamEnded = false;
    let wasReset = false;
    let origSetRawMode = null;
    const wasFlowing = (_a = stream.readableFlowing) !== null && _a !== void 0 ? _a : null;
    const originalListeners = saveAndRemoveListeners(stream, 'readable', 'data', 'keypress');
    if (isTTY && options.ttyRawMode !== false) {
        const rs = stream;
        wasRaw = rs.isRaw;
        rs.setRawMode(true);
        origSetRawMode = rs.setRawMode;
        rs.setRawMode = (value) => {
            wasRaw = null;
            rs.setRawMode = origSetRawMode;
            return rs.setRawMode(value);
        };
    }
    stream.prependListener('data', ondata);
    stream.prependListener('error', onerror);
    stream.prependListener('close', onclose);
    stream.prependListener('end', onend);
    if (!wasFlowing) {
        stream.resume();
    }
    function reset() {
        if (wasReset) {
            throw new Error('Tried to reset stream twice!');
        }
        wasReset = true;
        stream.removeListener('data', ondata);
        stream.removeListener('error', onerror);
        stream.removeListener('close', onclose);
        stream.removeListener('end', onend);
        originalListeners.restore();
        if (isTTY && wasRaw !== null) {
            stream.setRawMode(wasRaw);
        }
        if (origSetRawMode !== null) {
            stream.setRawMode = origSetRawMode;
        }
        if (wasFlowing === false) {
            stream.pause();
        }
        else if (wasFlowing === null) {
            stream.pause();
            const onnewlistener = (event) => {
                if (event === 'data' || event === 'readable') {
                    stream.resume();
                }
            };
            const onresume = () => {
                stream.removeListener('newListener', onnewlistener);
                stream.removeListener('resume', onresume);
            };
            stream.addListener('newListener', onnewlistener);
            stream.addListener('resume', onresume);
        }
    }
    function ondata(input) {
        options.ondata(input);
    }
    function onend() {
        streamEnded = true;
        reset();
        options.onend(null);
    }
    function onerror(err) {
        streamEnded = true;
        reset();
        options.onend(err);
    }
    function onclose() {
        streamEnded = true;
        reset();
        options.onend(new Error('Stream closed before data could be read'));
    }
    return {
        restore(unshiftData) {
            reset();
            if ((unshiftData === null || unshiftData === void 0 ? void 0 : unshiftData.length) > 0 && !streamEnded) {
                stream.unshift(unshiftData);
            }
        }
    };
}
module.exports = hijackStream;
//# sourceMappingURL=index.js.map