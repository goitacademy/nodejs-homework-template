"use strict";
const util_1 = require("util");
const whatwg_url_1 = require("whatwg-url");
class MongoParseError extends Error {
}
const ALLOWED_TXT_OPTIONS = ['authSource', 'replicaSet', 'loadBalanced'];
function matchesParentDomain(srvAddress, parentDomain) {
    const regex = /^.*?\./;
    const srv = `.${srvAddress.replace(regex, '')}`;
    const parent = `.${parentDomain.replace(regex, '')}`;
    return srv.endsWith(parent);
}
async function resolveDnsSrvRecord(dns, lookupAddress, srvServiceName) {
    const addresses = await (0, util_1.promisify)(dns.resolveSrv)(`_${srvServiceName}._tcp.${lookupAddress}`);
    if (!(addresses === null || addresses === void 0 ? void 0 : addresses.length)) {
        throw new MongoParseError('No addresses found at host');
    }
    for (const { name } of addresses) {
        if (!matchesParentDomain(name, lookupAddress)) {
            throw new MongoParseError('Server record does not share hostname with parent URI');
        }
    }
    return addresses.map(r => { var _a; return r.name + (((_a = r.port) !== null && _a !== void 0 ? _a : 27017) === 27017 ? '' : `:${r.port}`); });
}
async function resolveDnsTxtRecord(dns, lookupAddress) {
    var _a, _b, _c, _d, _e;
    let records;
    try {
        records = await (0, util_1.promisify)(dns.resolveTxt)(lookupAddress);
    }
    catch (err) {
        if ((err === null || err === void 0 ? void 0 : err.code) && (err.code !== 'ENODATA' && err.code !== 'ENOTFOUND')) {
            throw err;
        }
    }
    let txtRecord;
    if (records && records.length > 1) {
        throw new MongoParseError('Multiple text records not allowed');
    }
    else {
        txtRecord = (_b = (_a = records === null || records === void 0 ? void 0 : records[0]) === null || _a === void 0 ? void 0 : _a.join('')) !== null && _b !== void 0 ? _b : '';
    }
    const txtRecordOptions = new whatwg_url_1.URLSearchParams(txtRecord);
    const txtRecordOptionKeys = [...txtRecordOptions.keys()];
    if (txtRecordOptionKeys.some(key => !ALLOWED_TXT_OPTIONS.includes(key))) {
        throw new MongoParseError(`Text record must only set ${ALLOWED_TXT_OPTIONS.join(', ')}`);
    }
    const source = (_c = txtRecordOptions.get('authSource')) !== null && _c !== void 0 ? _c : undefined;
    const replicaSet = (_d = txtRecordOptions.get('replicaSet')) !== null && _d !== void 0 ? _d : undefined;
    const loadBalanced = (_e = txtRecordOptions.get('loadBalanced')) !== null && _e !== void 0 ? _e : undefined;
    if (source === '' || replicaSet === '' || loadBalanced === '') {
        throw new MongoParseError('Cannot have empty URI params in DNS TXT Record');
    }
    if (loadBalanced !== undefined && loadBalanced !== 'true' && loadBalanced !== 'false') {
        throw new MongoParseError(`DNS TXT Record contains invalid value ${loadBalanced} for loadBalanced option (allowed: true, false)`);
    }
    return txtRecordOptions;
}
async function resolveMongodbSrv(input, options) {
    var _a;
    const dns = (_a = options === null || options === void 0 ? void 0 : options.dns) !== null && _a !== void 0 ? _a : require('dns');
    if (input.startsWith('mongodb://')) {
        return input;
    }
    if (!input.startsWith('mongodb+srv://')) {
        throw new MongoParseError('Unknown URL scheme');
    }
    const url = new whatwg_url_1.URL(input);
    if (url.port) {
        throw new Error('mongodb+srv:// URL cannot have port number');
    }
    const lookupAddress = url.hostname;
    const srvServiceName = url.searchParams.get('srvServiceName') || 'mongodb';
    const srvMaxHosts = +(url.searchParams.get('srvMaxHosts') || '0');
    const [srvResult, txtResult] = await Promise.all([
        resolveDnsSrvRecord(dns, lookupAddress, srvServiceName),
        resolveDnsTxtRecord(dns, lookupAddress)
    ]);
    if (srvMaxHosts && srvMaxHosts < srvResult.length) {
        srvResult.splice(0, srvResult.length, ...shuffle(srvResult, srvMaxHosts));
    }
    url.protocol = 'mongodb:';
    url.hostname = '__DUMMY_HOSTNAME__';
    if (!url.pathname) {
        url.pathname = '/';
    }
    for (const [key, value] of txtResult) {
        if (!url.searchParams.has(key)) {
            url.searchParams.set(key, value);
        }
    }
    if (!url.searchParams.has('tls') && !url.searchParams.has('ssl')) {
        url.searchParams.set('tls', 'true');
    }
    url.searchParams.delete('srvServiceName');
    url.searchParams.delete('srvMaxHosts');
    return url.toString().replace('__DUMMY_HOSTNAME__', srvResult.join(','));
}
function shuffle(sequence, limit = 0) {
    const items = Array.from(sequence);
    limit = Math.min(limit, items.length);
    let remainingItemsToShuffle = items.length;
    const lowerBound = limit % items.length === 0 ? 1 : items.length - limit;
    while (remainingItemsToShuffle > lowerBound) {
        const randomIndex = Math.floor(Math.random() * remainingItemsToShuffle);
        remainingItemsToShuffle -= 1;
        const swapHold = items[remainingItemsToShuffle];
        items[remainingItemsToShuffle] = items[randomIndex];
        items[randomIndex] = swapHold;
    }
    return limit % items.length === 0 ? items : items.slice(lowerBound);
}
module.exports = resolveMongodbSrv;
//# sourceMappingURL=index.js.map