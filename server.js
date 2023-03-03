
const app = require('./app');
const { connect } = require('mongoose');

const { MONGO_DB_URI, PORT = 5000 } = process.env;

(async () => {
  try {
    await connect(MONGO_DB_URI);

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
})();