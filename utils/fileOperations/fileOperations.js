const fs = require('fs/promises')

async function readDataFromFile(pathname) {
  try {
    const fileData = await fs.readFile(pathname, 'utf-8')
    return JSON.parse(fileData)
  } catch (error) {
    console.error(error.message)
    return false
  }
}

async function writeDataToFile(pathname, data) {
  try {
    await fs.writeFile(pathname, JSON.stringify(data), 'utf-8')
    return true
  } catch (error) {
    console.error(error.message)
    return false
  }
}

module.exports = {
  readDataFromFile,
  writeDataToFile
}
