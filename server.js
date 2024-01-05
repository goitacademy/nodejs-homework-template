const app = require('./app');
const { serverConfig } = require('./config');

const port = serverConfig.port ?? 4000;
module.exports = app.listen(port, () => {
  console.log(`Server running. Use our API on port: ${port}`)
})
