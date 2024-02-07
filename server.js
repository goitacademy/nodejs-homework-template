const app = require("./app");

const dbConnect = require("./db/connect");

const { PORT } = process.env;

async function startServer() {
  try {
    await dbConnect();
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();
