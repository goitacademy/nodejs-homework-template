const app = require("./app.js");
const dataBase = require("./dataBase/db.js");

const PORT = 3000;

dataBase
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}.`);
    });
  })
  .catch((error) => {
    console.log(`Server not run. Error:${error.message}`);
  });
