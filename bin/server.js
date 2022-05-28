const app = require("../app");
const db = require("../config");

require("../helpers");

const { PORT } = process.env || 3001;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. API port: ${PORT}`.brightBlue.bold);
  });
}).catch((err) => {
  console.log(`Server not running.Error: ${err.message}`.red.bold);
});
