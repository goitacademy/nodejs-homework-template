const app = require('./app');
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
const uriDb ="mongodb+srv://zheniaklimenchuk:1234@cluster0.p5cti98.mongodb.net/db-contacts?retryWrites=true&w=majority";

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );
