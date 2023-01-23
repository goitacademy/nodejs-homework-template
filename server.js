const app = require('./app')
const path = require('node:path');

require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const defaultPort = 3000;
const port = process.env.PORT || defaultPort;

app.listen(port, () => {
  console.log(`Server run on http://localhost:${port}`)
})
