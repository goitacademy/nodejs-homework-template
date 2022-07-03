const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();
const connecting = mongoose.connect(
 `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.myxww8i.mongodb.net/?retryWrites=true`,
 {
   dbName: "db-contacts",
 }
);
connecting
.then(() => {
app.listen(process.env.PORT, function () {
  console.log(`Server running. Use our API on port: ${process.env.PORT}`);
  console.log("Database connection successful");
});
})
.catch((err) => {
  console.log(`Server not started.Error message: ${err.message}`)
  process.exit(1);
});

