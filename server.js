const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 8889;

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error at a server launch:", err);
  }
  console.log(`Server running. Use our API on port: ${PORT} `);
});
