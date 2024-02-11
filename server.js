const createApp = require("./app");
const { connect } = require("./db");

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connect();
    const app = createApp();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);
  }
})();
