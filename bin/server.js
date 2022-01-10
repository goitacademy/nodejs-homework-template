const mongoose = require("mongoose");
const app = require("../app");
require("dotenv").config();
mongoose.Promise = global.Promise;

const PORT = process.env.PORT || 3000;
try {
  const session = mongoose.connect(process.env.DB_HOST_REMOTE);
  session.then((data) => {
    data.connections[0].name &&
      app.listen(PORT, () => {
        const { port, name } = data.connections[0];
        console.log(`Database connection successfully. DB name is "${name}" on port "${port}".`);
      });
  });
} catch (error) {
  console.log("DB connection Error: ");
  process.exit(1);
}

module.exports = mongoose;
