const app = require('./app')
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;
const connection = mongoose.connect(uriDb,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Database connect success`);
    });
  })
  .catch(error => {
    console.error(error.massage);
    process.exit(1)
  })



