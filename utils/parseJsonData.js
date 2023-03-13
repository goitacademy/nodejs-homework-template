const fs = require('fs/promises')

const parseJsonData = async (path) => {
    const dataJSON = await fs.readFile(path)
    const data = JSON.parse(dataJSON)

    return data
}

module.exports = parseJsonData