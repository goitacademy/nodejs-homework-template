import mongoose from "mongoose";

import app from "./app.js";

const DB_HOST="mongodb+srv://KateSyvash:9DcDi55aHsPDDuXv@cluster0.43gb4ov.mongodb.net/?retryWrites=true&w=majority";
 const PORT=3000;

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    })
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })