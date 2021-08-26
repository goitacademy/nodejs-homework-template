const path = require('path')
const fs = require('fs').promises
require('dotenv').config()

const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR)

const isAccessible = (path) => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false)
}

const createFolderIfNotExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder)
  }
}