const mongo = require("mongoose");
const app = require("../app");

const { PORT = 3032, DB_HOST } = process.env;

mongo
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
