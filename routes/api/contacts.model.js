const mongoose = require("mongoose");
const { Schema } = mongoose;
require("dotenv").config();

const contactSchema = new Schema({
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

let contactModel = {};
async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://and_mar:${process.env.MONGO_DB_PASSWORD}@cluster0.8cpylgv.mongodb.net/?retryWrites=true&w=majority`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();

contactModel = mongoose.model("db-contacts", contactSchema);

module.exports = contactModel;
