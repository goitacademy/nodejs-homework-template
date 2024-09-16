const app = require('./app');
require('colors');

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log('Server running. Use our API on port: 3000'.blue);
});
