const crypto = require('crypto');
const fs = require('fs');

const secret = crypto.randomBytes(64).toString('hex');
console.log(`JWT_SECRET=${secret}`);
fs.appendFileSync('.env', `\nJWT_SECRET=${secret}`);
