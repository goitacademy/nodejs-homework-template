const base64 = require("base-64");
const md5 = require("md5"); // do not use md5

async function main() {
// encoding
    const str = "come text";
const encodedStr = base64.encode(str);
console.log('encodedStr:', encodedStr);

const decodedStr = base64.decode(encodedStr);
console.log('decodedStr:', decodedStr);

// hashing
const str2 = "some text"
const hashedStr = md5(str2); 
console.log('hashedStr:', hashedStr);

}

main();