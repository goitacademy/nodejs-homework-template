const app = require('../app');
const mongoose = require('mongoose');

const { DB_HOST } = require('../config');

// const PORT = process.env.PORT || 3000
const { PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTOpology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(error => console.log(error));
