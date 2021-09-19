const app = require('../app');
const mongoose = require('mongoose');
require('dotenv').config();
// const dotenv = require('dotenv');

// dotenv.config();

const { DB_HOST, PORT = 3000 } = process.env;

// const PORT = process.env.PORT || 3000
// const { PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(error => console.log(error));
