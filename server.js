const path = require('path');
const configPath = path.join(__dirname, 'config', '.env');
require('dotenv').config({ path: configPath });
const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log(
    `Server running. Use our API on port: ${process.env.PORT}`.green.italic.bold
  );
});
