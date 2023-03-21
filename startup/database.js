const mongoose = require("mongoose");

const dbpath =
  "mongodb+srv://pdrech:nlz6FtHqV6Pm8xki@contacts.uh3je7z.mongodb.net/?retryWrites=true&w=majority";

const connectDatabase = async () => {
  await mongoose
    .connect(dbpath)
    .then(() => console.log("Connected to mongo db..."))
    .catch((err) => console.log("Error to connect to db" + err));
};

module.exports = { connectDatabase };
