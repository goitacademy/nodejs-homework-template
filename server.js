const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT;

mongoose.Promise = global.Promise;

const connection = mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(app.listen(PORT, () => console.log(`Server running. Use our API on port: ${PORT}`)))
  .catch(error => {
    console.log(error);
    process.exit();
  });
