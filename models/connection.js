const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const uriDb = process.env.MONGO_URL;
const connection = async () => mongoose.connect(uriDb);

module.exports = connection;
