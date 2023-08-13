const { mongoose } = require("mongoose");
const app = require("./app");

const PORT = 3001;

const { PASSWORD, USERNAME, CLASTERNAME, DB_NAME } = process.env;
const DB_HOST = `mongodb+srv://${USERNAME}:${PASSWORD}@${CLASTERNAME}.ohx0zsm.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("connect seccesfull");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
