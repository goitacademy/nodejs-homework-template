const { getMongoCryptSharedLibraryVersion } = require('bindings')('mongodb_crypt_library_version');

module.exports = getMongoCryptSharedLibraryVersion;
