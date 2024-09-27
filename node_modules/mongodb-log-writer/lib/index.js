"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoLogManager = exports.MongoLogWriter = exports.mongoLogId = void 0;
const bson_1 = require("bson");
const events_1 = require("events");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const stream_1 = require("stream");
const util_1 = require("util");
const zlib_1 = require("zlib");
const heap_js_1 = require("heap-js");
function mongoLogId(id) {
    return { __value: id };
}
exports.mongoLogId = mongoLogId;
function validateLogEntry(info) {
    var _a;
    if (typeof info.s !== 'string') {
        return new TypeError('Cannot log messages without a severity field');
    }
    if (typeof info.c !== 'string') {
        return new TypeError('Cannot log messages without a component field');
    }
    if (typeof ((_a = info.id) === null || _a === void 0 ? void 0 : _a.__value) !== 'number') {
        return new TypeError('Cannot log messages without an id field');
    }
    if (typeof info.ctx !== 'string') {
        return new TypeError('Cannot log messages without a context field');
    }
    if (typeof info.msg !== 'string') {
        return new TypeError('Cannot log messages without a message field');
    }
    return null;
}
class MongoLogWriter extends stream_1.Writable {
    constructor(logId, logFilePath, target, now) {
        super({ objectMode: true });
        this.mongoLogId = mongoLogId;
        this._logId = logId;
        this._logFilePath = logFilePath;
        this._target = target;
        this._now = now !== null && now !== void 0 ? now : (() => new Date());
    }
    get logId() {
        return this._logId;
    }
    get logFilePath() {
        return this._logFilePath;
    }
    get target() {
        return this._target;
    }
    _write(info, encoding, callback) {
        var _a;
        const validationError = validateLogEntry(info);
        if (validationError) {
            callback(validationError);
            return;
        }
        const fullInfo = {
            t: (_a = info.t) !== null && _a !== void 0 ? _a : this._now(),
            s: info.s,
            c: info.c,
            id: info.id.__value,
            ctx: info.ctx,
            msg: info.msg
        };
        if (info.attr) {
            if (Object.prototype.toString.call(info.attr) === '[object Error]') {
                fullInfo.attr = {
                    stack: info.attr.stack,
                    name: info.attr.name,
                    message: info.attr.message,
                    code: info.attr.code,
                    ...info.attr
                };
            }
            else {
                fullInfo.attr = info.attr;
            }
        }
        this.emit('log', fullInfo);
        try {
            bson_1.EJSON.stringify(fullInfo.attr);
        }
        catch (_b) {
            try {
                const v8 = require('v8');
                const cloned = v8.deserialize(v8.serialize(fullInfo.attr));
                bson_1.EJSON.stringify(cloned);
                fullInfo.attr = cloned;
            }
            catch (_c) {
                try {
                    const cloned = JSON.parse(JSON.stringify(fullInfo.attr));
                    bson_1.EJSON.stringify(cloned);
                    fullInfo.attr = cloned;
                }
                catch (_d) {
                    fullInfo.attr = { _inspected: (0, util_1.inspect)(fullInfo.attr) };
                }
            }
        }
        this._target.write(bson_1.EJSON.stringify(fullInfo, { relaxed: true }) + '\n', callback);
    }
    _final(callback) {
        this._target.end(callback);
    }
    async flush() {
        await new Promise(resolve => this._target.write('', resolve));
    }
    info(component, id, context, message, attr) {
        const logEntry = {
            s: 'I',
            c: component,
            id: id,
            ctx: context,
            msg: message,
            attr: attr
        };
        this.write(logEntry);
    }
    warn(component, id, context, message, attr) {
        const logEntry = {
            s: 'W',
            c: component,
            id: id,
            ctx: context,
            msg: message,
            attr: attr
        };
        this.write(logEntry);
    }
    error(component, id, context, message, attr) {
        const logEntry = {
            s: 'E',
            c: component,
            id: id,
            ctx: context,
            msg: message,
            attr: attr
        };
        this.write(logEntry);
    }
    fatal(component, id, context, message, attr) {
        const logEntry = {
            s: 'F',
            c: component,
            id: id,
            ctx: context,
            msg: message,
            attr: attr
        };
        this.write(logEntry);
    }
    debug(component, id, context, message, attr, level = 1) {
        const logEntry = {
            s: `D${level}`,
            c: component,
            id: id,
            ctx: context,
            msg: message,
            attr: attr
        };
        this.write(logEntry);
    }
    bindComponent(component) {
        return {
            unbound: this,
            component: component,
            write: (entry, cb) => this.write({ c: component, ...entry }, cb),
            info: this.info.bind(this, component),
            warn: this.warn.bind(this, component),
            error: this.error.bind(this, component),
            fatal: this.fatal.bind(this, component),
            debug: this.debug.bind(this, component)
        };
    }
}
exports.MongoLogWriter = MongoLogWriter;
class MongoLogManager {
    constructor(options) {
        this._options = options;
    }
    async cleanupOldLogfiles(maxDurationMs = 5000) {
        var _a, _b, _c;
        const dir = this._options.directory;
        let dirHandle;
        try {
            dirHandle = await fs_1.promises.opendir(dir);
        }
        catch (_d) {
            return;
        }
        const deletionStartTimestamp = Date.now();
        const deletionCutoffTimestamp = deletionStartTimestamp - this._options.retentionDays * 86400 * 1000;
        const leastRecentFileHeap = new heap_js_1.Heap((a, b) => a.fileTimestamp - b.fileTimestamp);
        for await (const dirent of dirHandle) {
            if (Date.now() - deletionStartTimestamp > maxDurationMs)
                break;
            if (!dirent.isFile())
                continue;
            const { id } = (_b = (_a = dirent.name.match(/^(?<id>[a-f0-9]{24})_log(\.gz)?$/i)) === null || _a === void 0 ? void 0 : _a.groups) !== null && _b !== void 0 ? _b : {};
            if (!id)
                continue;
            const fileTimestamp = +new bson_1.ObjectId(id).getTimestamp();
            const fullPath = path_1.default.join(dir, dirent.name);
            let toDelete;
            if (fileTimestamp < deletionCutoffTimestamp) {
                toDelete = fullPath;
            }
            else if (this._options.maxLogFileCount) {
                leastRecentFileHeap.push({ fullPath, fileTimestamp });
                if (leastRecentFileHeap.size() > this._options.maxLogFileCount) {
                    toDelete = (_c = leastRecentFileHeap.pop()) === null || _c === void 0 ? void 0 : _c.fullPath;
                }
            }
            if (!toDelete)
                continue;
            try {
                await fs_1.promises.unlink(toDelete);
            }
            catch (err) {
                if ((err === null || err === void 0 ? void 0 : err.code) !== 'ENOENT') {
                    this._options.onerror(err, fullPath);
                }
            }
        }
    }
    async createLogWriter() {
        const logId = new bson_1.ObjectId().toString();
        const doGzip = !!this._options.gzip;
        const logFilePath = path_1.default.join(this._options.directory, `${logId}_log${doGzip ? '.gz' : ''}`);
        let originalTarget;
        let stream;
        let logWriter;
        try {
            stream = (0, fs_1.createWriteStream)(logFilePath, { mode: 0o600 });
            originalTarget = stream;
            await (0, events_1.once)(stream, 'ready');
            if (doGzip) {
                stream = (0, zlib_1.createGzip)({
                    flush: zlib_1.constants.Z_SYNC_FLUSH,
                    level: zlib_1.constants.Z_MAX_LEVEL
                });
                stream.pipe(originalTarget);
            }
            else {
                stream.on('finish', () => stream.emit('log-finish'));
            }
        }
        catch (err) {
            this._options.onwarn(err, logFilePath);
            stream = new stream_1.Writable({
                write(chunk, enc, cb) {
                    cb();
                }
            });
            originalTarget = stream;
            logWriter = new MongoLogWriter(logId, null, stream);
        }
        if (!logWriter) {
            logWriter = new MongoLogWriter(logId, logFilePath, stream);
        }
        originalTarget.on('finish', () => logWriter === null || logWriter === void 0 ? void 0 : logWriter.emit('log-finish'));
        return logWriter;
    }
}
exports.MongoLogManager = MongoLogManager;
//# sourceMappingURL=index.js.map