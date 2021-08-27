const app = require("../app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const { DB_HOST, PORT = 3000 } = process.env;
mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    })
  )
  .catch((error) => console.log(error.message));
