const setupMongoConnection = require('./untils/mobogDbConection');
const createDirIfNotExists = require('./untils/createDirIfNotExists')
const path = require('path')

const UPLOAD_TMP = path.join(process.cwd(),'tmp');


(async () => {
  await setupMongoConnection();
  await createDirIfNotExists(UPLOAD_TMP)
  require('./adapters');
})();