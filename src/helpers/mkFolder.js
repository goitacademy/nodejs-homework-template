const fs = require('fs/promises')

const mkFolder = async path => {
  let isExists
  try {
    await fs.access(path)
    isExists = true
  } catch (error) {
    isExists = false
  }

  if (!isExists) {
    await fs.mkdir(path)
  }
}

module.exports = mkFolder