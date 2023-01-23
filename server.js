require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT || 3000;

const { mongoConnect } = require('./db/connections');

const start = async () => {
  try {
    await mongoConnect();
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
