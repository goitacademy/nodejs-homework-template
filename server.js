const mongoose = require('mongoose');
const app = require('./app');

const { DB_HOST, PORT } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(5000, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
    console.log("Database connect success");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

