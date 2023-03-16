const app = require("./app");
const checkFolders = require("./src/helpers");

const { connectMongo } = require("./src/db/connection");

const PORT = process.env.PORT || 8081;

const start = async () => {
  await connectMongo();
  app.listen(PORT, async (err) => {
    if (err) {
      console.log(`Err at server launch:`, err);
    }
    await checkFolders.createUploadDir();
    await checkFolders.createAvatarsDir();
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
};

start();
