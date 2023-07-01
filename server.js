const app = require("./app");
const mongoose = require("mongoose");

const uriDB = process.env.DB_HOST;
const PORT = process.env.PORT || 3000;

const connections = mongoose.connect(uriDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connections
  .then(() => {
    app.listen(PORT, function () {
      console.log(
        `Database connection successful. Server running on port ${PORT}`
      );
    });
  })
  .catch((e) => {
    console.log(`Server not running. Error : ${e.message}`);
    process.exit(1);
  });
