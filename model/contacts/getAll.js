const fs = require('fs/promises')
const filePath = require('./filePath')


const getAll = async() => {
    const contacts = await fs.readFile(filePath, 'utf8')
    return JSON.parse(contacts);
  }

module.exports = getAll
