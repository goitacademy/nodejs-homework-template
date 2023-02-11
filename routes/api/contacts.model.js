const mongoose = require("mongoose");
const { Schema } = mongoose;

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
      "mongodb+srv://vitititi:Vo4okidik123@mongodb-test.586p9pl.mongodb.net/test_db?retryWrites=true&w=majority"
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();

contactModel = mongoose.model("Db-contacts", contactSchema);

module.exports = contactModel;
