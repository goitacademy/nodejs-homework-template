import mongoose from "mongoose";
import app from "./app.js";
import { initFolders } from "./utils/manageUploadFolders.js";

const PORT = 2200;
const SRV_DB = process.env.DB_HOST;

const connection = mongoose.connect(SRV_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, async () => {
      await initFolders();
      console.log(`Database connection successful on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });

export default PORT;