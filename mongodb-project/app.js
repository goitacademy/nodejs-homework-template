const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config();
require("dotenv").config();
const { Contact } = require("./models");

const { DB_HOST } = process.env;

const newContact = {
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
};

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    try {
      const result = await Contact.create(newContact);
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
    // Contact.create(newContact, (error, data) => {
    //   console.log(error);
    //   console.log(data);
    // });
  })
  .catch((error) => {
    console.log(error.message);
  });
