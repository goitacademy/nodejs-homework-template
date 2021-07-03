const fs = require('fs/promises')

const isAccesseble = async path => {
  try {
    await fs.access(path)
    return true
  } catch (err) {
    return false
  }
}

const createFolderIfNotExist = async folder => {
  if (!(await isAccesseble(folder))) {
    await fs.mkdir(folder)
  }
}
module.exports = {
  createFolderIfNotExist,
}
