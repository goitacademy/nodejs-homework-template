const mongoose = require('mongoose');
const app = require('./app');

mongoose.set('strictQuery', true);

const DB = process.env.MONGO_URL;
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST;

console.log('DB ---->', DB);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`Server started: http://${HOST}:${PORT}/api/contacts`);
    });
  })
  .catch(error => {
    console.log(`can not connect to database, ${error}`);
    process.exit(1);
  });
