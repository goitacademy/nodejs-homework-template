const app = require('./app');
const mongoose = require('mongoose');
const envsConfigs = require('./configs/envsConfigs');

mongoose
  .connect(envsConfigs.db_host)
  .then(() => {
    app.listen(envsConfigs.port, () => {
      console.log(
        `Database connection successful. Use our API on port: ${envsConfigs.port}`
      );
    });
  })
  .catch(() => {
    console.log('connection error');
    process.exit(1);
  });
