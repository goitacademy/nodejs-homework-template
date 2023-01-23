const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 8081;

app.listen(PORT, (err) => {
  if (err) console.log(`Err at server launch:`, err);
  console.log(`Server running. Use our API on port: ${PORT}`);
});
