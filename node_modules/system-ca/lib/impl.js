"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.macosImpl = exports.windowsImpl = exports.unixAsyncImpl = exports.unixSyncImpl = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const DEFAULT_UNIX_CERT_FILES = [
    '/etc/ssl/certs/ca-certificates.crt',
    '/etc/pki/tls/certs/ca-bundle.crt',
    '/etc/ssl/ca-bundle.pem',
    '/etc/pki/tls/cacert.pem',
    '/etc/pki/ca-trust/extracted/pem/tls-ca-bundle.pem',
    '/etc/ssl/cert.pem'
];
const DEFAULT_UNIX_CERT_DIRS = [
    '/etc/ssl/certs',
    '/etc/pki/tls/certs',
    '/system/etc/security/cacerts'
];
const PEM_CERT_REGEXP = /-----BEGIN\s+CERTIFICATE-----[\s\S]+?-----END\s+CERTIFICATE-----$/mg;
function getUnixFiles(env) {
    let files = DEFAULT_UNIX_CERT_FILES;
    let dirs = DEFAULT_UNIX_CERT_DIRS;
    if (env.SSL_CERT_FILE) {
        files = [env.SSL_CERT_FILE];
    }
    if (env.SSL_CERT_DIR) {
        dirs = env.SSL_CERT_DIR.split(':');
    }
    return { files, dirs };
}
function* unixSyncImpl(env) {
    const { files, dirs } = getUnixFiles(env);
    const allFiles = [...files];
    let err;
    let hasSeenCertificate = false;
    for (const dir of dirs) {
        try {
            allFiles.push(...fs_1.default.readdirSync(dir).map(file => path_1.default.join(dir, file)));
        }
        catch (err_) {
            err !== null && err !== void 0 ? err : (err = err_);
        }
    }
    for (const file of allFiles) {
        try {
            const content = fs_1.default.readFileSync(file, 'utf8');
            const matches = content.match(PEM_CERT_REGEXP);
            if (!matches)
                continue;
            hasSeenCertificate || (hasSeenCertificate = matches.length > 0);
            yield* matches.map(cert => cert.trim());
        }
        catch (err_) {
            err !== null && err !== void 0 ? err : (err = err_);
        }
    }
    if (!hasSeenCertificate && err) {
        throw err;
    }
}
exports.unixSyncImpl = unixSyncImpl;
async function* unixAsyncImpl(env) {
    const { files, dirs } = getUnixFiles(env);
    const allFiles = [...files];
    let err;
    let hasSeenCertificate = false;
    for (const dir of dirs) {
        try {
            allFiles.push(...(await fs_1.default.promises.readdir(dir)).map(file => path_1.default.join(dir, file)));
        }
        catch (err_) {
            err !== null && err !== void 0 ? err : (err = err_);
        }
    }
    for (const file of allFiles) {
        try {
            const content = await fs_1.default.promises.readFile(file, 'utf8');
            const matches = content.match(PEM_CERT_REGEXP);
            if (!matches)
                continue;
            hasSeenCertificate || (hasSeenCertificate = matches.length > 0);
            yield* matches.map(cert => cert.trim());
        }
        catch (err_) {
            err !== null && err !== void 0 ? err : (err = err_);
        }
    }
    if (!hasSeenCertificate && err) {
        throw err;
    }
}
exports.unixAsyncImpl = unixAsyncImpl;
function* windowsImpl() {
    let exportSystemCertificates;
    try {
        ({ exportSystemCertificates } = require('win-export-certificate-and-key'));
    }
    catch (err) {
        throw err;
    }
    yield* exportSystemCertificates({ store: 'ROOT' });
    yield* exportSystemCertificates({ store: 'CA' });
}
exports.windowsImpl = windowsImpl;
function* macosImpl() {
    let exportSystemCertificates;
    try {
        ({ exportSystemCertificates } = require('macos-export-certificate-and-key'));
    }
    catch (err) {
        throw err;
    }
    yield* exportSystemCertificates();
}
exports.macosImpl = macosImpl;
//# sourceMappingURL=impl.js.map