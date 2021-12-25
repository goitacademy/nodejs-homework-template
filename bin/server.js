const mogoose = require("mongoose");
const app = require("../app");

const { DB_HOST, PORT = 3000 } = process.env;

mogoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Database connection successful. Use our API on port: ${PORT}`,
      );
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
