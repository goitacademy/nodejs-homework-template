const setupMongoConnection = require('./untils/mobogDbConection');
const createDirIfNotExists = require('./untils/createDirIfNotExists')
const path = require('path')

const UPLOAD_PABLIC = path.join(process.cwd(),'public');
const UPLOAD_AVATAR = path.join(process.cwd(),'public/avatars');

(async () => {
  await setupMongoConnection();
  await createDirIfNotExists(UPLOAD_PABLIC)
  await createDirIfNotExists(UPLOAD_AVATAR)
  require('./adapters');
})();