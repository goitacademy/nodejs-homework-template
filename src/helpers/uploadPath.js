const path = require('path')
require('dotenv-expand')(require('dotenv').config())
const { UPLOAD_DIR, AVATARS_DIR } = process.env

module.exports = {
  UPLOADS: path.join(process.cwd(), UPLOAD_DIR),
  AVATARS: path.join(process.cwd(), AVATARS_DIR),
}