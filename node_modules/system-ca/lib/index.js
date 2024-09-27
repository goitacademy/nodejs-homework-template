"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.systemCertsAsync = exports.systemCertsSync = void 0;
const impl_1 = require("./impl");
const tls_1 = require("tls");
const events_1 = require("events");
function maybeAddNodeCertificates(certs, opts) {
    if (opts.includeNodeCertificates) {
        for (const cert of tls_1.rootCertificates) {
            certs.add(cert);
        }
    }
    return [...certs];
}
function systemCertsSync(opts = {}) {
    var _a;
    let certs;
    if (process.platform === 'win32') {
        certs = new Set((0, impl_1.windowsImpl)());
    }
    else if (process.platform === 'darwin') {
        certs = new Set((0, impl_1.macosImpl)());
    }
    else {
        certs = new Set((0, impl_1.unixSyncImpl)((_a = opts.env) !== null && _a !== void 0 ? _a : process.env));
    }
    return maybeAddNodeCertificates(certs, opts);
}
exports.systemCertsSync = systemCertsSync;
async function systemCertsAsync(opts = {}) {
    var _a;
    let certs;
    if (process.platform === 'win32' || process.platform === 'darwin') {
        const script = `
    const { parentPort } = require('worker_threads');
    const iterable = require(${JSON.stringify(__filename)}).systemCertsSync(${JSON.stringify(opts)});
    parentPort.postMessage(new Set(iterable));
    `;
        try {
            const { Worker } = await Promise.resolve().then(() => __importStar(require('worker_threads')));
            const worker = new Worker(script, { eval: true });
            const [result] = await (0, events_1.once)(worker, 'message');
            certs = result;
        }
        catch (err) {
            opts.asyncFallbackError = err;
            return systemCertsSync();
        }
    }
    else {
        certs = new Set();
        for await (const cert of (0, impl_1.unixAsyncImpl)((_a = opts.env) !== null && _a !== void 0 ? _a : process.env)) {
            certs.add(cert);
        }
    }
    return maybeAddNodeCertificates(certs, opts);
}
exports.systemCertsAsync = systemCertsAsync;
//# sourceMappingURL=index.js.map