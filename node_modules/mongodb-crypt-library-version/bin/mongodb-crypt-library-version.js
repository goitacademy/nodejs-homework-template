#!/usr/bin/env node
const getCSFLESharedLibraryVersion = require('..');
if (!process.argv[2]) {
  console.error('Usage: mongodb-csfle-library-version <path/to/mongo_csfle_v1.so>');
  process.exitCode = 1;
} else {
  try {
    const { version, versionStr } = getCSFLESharedLibraryVersion(process.argv[2]);
    console.log(`${versionStr} (0x${version.toString(16).padStart(16, '0')})`);
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
  }
}
