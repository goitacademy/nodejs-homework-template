const mongoose = require("mongoose");

const dbURL =
  "mongodb+srv://mrmaddarknes:sNI2jv2le4icneK8@vorongorclacter.hsxv0qo.mongodb.net/db-contacts";

mongoose.connect(dbURL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log(`Підключено до MongoDB Atlas на ${dbURL}`);
});

db.on("error", (err) => {
  console.error("Помилка підключення до MongoDB Atlas:", err);
});

db.on("disconnected", () => {
  console.log("Відключено від MongoDB Atlas");
});

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = {
  db,
  Contact,
};
