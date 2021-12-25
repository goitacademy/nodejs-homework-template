import app from "../app";
import db from "../db/db";
// eslint-disable-next-line no-unused-vars
import { colors } from "../helpers";

const PORT = process.env.PORT || 8080;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`.cyan);
  });
}).catch((err) => {
  console.log(`Server not running. Error: ${err.message}`.red);
});
