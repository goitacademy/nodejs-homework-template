require("dotenv").config();
const {connectDb} = require('./db/connectDb');
const app = require('./app')

const { PORT, DB_URI } = process.env;

(async () => {
  await connectDb(DB_URI);
  console.log(`Database connection established successfully`);
  app.listen(PORT, () => {
    console.log(
      `Server is up and running on port 3000  http://localhost:${PORT}`
    );
  });
})();