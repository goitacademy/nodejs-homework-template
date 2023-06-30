const app = require("./app.js");
const database = require("./db/database");

const PORT = process.env.PORT || 3000;

database
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Database connection successful`);
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );
