require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 8081;

app.listen(PORT, error => {
  if (error) console.error('Error at server launch: ', error);
  console.log(`Server running at port: ${PORT}`);
});
