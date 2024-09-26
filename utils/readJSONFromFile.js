const {readFile} = require('fs/promises')

const readJSONFromFile = async (path) => {
    const content = (await readFile(path)).toString();
    return JSON.parse(content);
}

module.exports = readJSONFromFile;