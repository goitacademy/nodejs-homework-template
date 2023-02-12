const app = require("./app");
const mongoose = require("mongoose");
const { createFolderNotExisting } = require("./utils/makeFolders.js");
const { tmpDir, avatarDir } = require("./middlewares/upload.js");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, async () => {
      await createFolderNotExisting(tmpDir);
      await createFolderNotExisting(avatarDir);
      console.log("\nDatabase connection successful.");
      console.log(`Use our API on port: ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(`Server not running. Error message: ${e.message}`);
    process.exit(1);
  });
