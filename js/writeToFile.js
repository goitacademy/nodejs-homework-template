const fs = require('fs/promises')

const writeToFile = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
  } catch (err) {
    console.error('Wrong path to file!')
    console.error(err.message)
  }
}

module.exports = writeToFile
