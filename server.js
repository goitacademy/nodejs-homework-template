// const app = require('./app');

// app.listen(3000, () => {
//   console.log('Server running. Use our API on port: 3000');
// });

const app = require('./app');
require('dotenv').config({ path: `${__dirname}/.env` });

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST;

app.listen(PORT, () => {
  console.log(`Server started: http://${HOST}:${PORT}`);
});
