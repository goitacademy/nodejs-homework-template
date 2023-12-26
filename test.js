const mongoose = require("mongoose");
// const { model, Schema } = require("mongoose");

mongoose
  .connect("mongodb+srv://iamblinova:3qrcQxRLjkpyhets@cluster0.nu3ux3o.mongodb.net/db-contacts")
  .then(() => {
    console.log("Database connection successful");
    getAllContacts();
  })
  .catch((error) => {
    console.log(error);
    process.exit(1); //should refactoring code to async/awate
  });

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Duplicated email.."],
  },
  phone: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const getAllContacts = async () => {
  const ContactModel = mongoose.model("contact", contactSchema);
  const allContacts = await ContactModel.findOne({ _id: "65842157e462c3fdb307d970" });
  console.log("print models");
  console.log(allContacts);
};
