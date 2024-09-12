const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, err => {
  if (err) console.error('Error at aserver launch:', err);
  console.log(`Server works at port: ${PORT}!`);
});