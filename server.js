const app = require('./app')
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.set("strictQuery", false);

const HOST_URI = process.env.HOST_URI;

const PORT = process.env.PORT || 3000;

(async function () {
  try {
    await mongoose.connect(HOST_URI);
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
})();
