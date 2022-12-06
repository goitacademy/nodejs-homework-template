const { app, connection } = require("./app");
require("dotenv").config();
const PORT = process.env.PORT;

connection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server error, ${err}`);
    process.exit(1);
  });
