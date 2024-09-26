const {writeFile} = require('fs/promises')

const writeJSONToFile = async (path, content) => {
     await writeFile(path, JSON.stringify(content, null, 2))
}

module.exports = writeJSONToFile;