const setupMongoConnection = require('./untils/mobogDbConection');
(async () => {
  await setupMongoConnection();
  require('./adapters');
})();