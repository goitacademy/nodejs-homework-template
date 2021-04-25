const app = require("../app");
const db = require("../src/db");

const PORT = process.env.PORT || 3000;

db.then(() => {
  console.log("Database connection successful");

  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server no running. Error message: ${err.message}`);
  process.exit(1);
});
