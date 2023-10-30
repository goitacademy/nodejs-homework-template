import { app } from "./app.js";
import { mongoose } from "mongoose";
import "dotenv/config";
const { DB_HOST: uriDb } = process.env;

const connection = mongoose.connect(uriDb);

connection
  .then(
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    })
  )
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );
