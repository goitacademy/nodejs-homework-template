const { default: mongoose } = require("mongoose");

const Contacts = mongoose.model("contacts", {
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
  owner: {
    type: Object,
    ref: "user",
  },
});

const listContacts = () => {
  try {
    return Contacts.find();
  } catch (error) {
    console.error("An error occurred");
  }
};

const getContactById = (contactId) => {
  try {
    return Contacts.findOne({ _id: contactId });
  } catch (error) {
    console.error("An error occurred");
  }
};

const removeContact = (contactId) => {
  try {
    return Contacts.findByIdAndDelete({ _id: contactId });
  } catch (error) {
    console.error(error);
  }
};

const addContact = (body) => {
  try {
    const { name, email, phone, favorite } = body;
    const newContact = new Contacts({
      name: name,
      email: email,
      phone: phone,
      favorite: favorite,
    });

    return newContact.save();
  } catch (error) {
    console.error(error);
  }
};

const updateContact = (contactId, body) => {
  try {
    return Contacts.findByIdAndUpdate({ _id: contactId }, body, {
      new: true,
    });
  } catch (error) {
    console.error(error);
  }
};
const updateStatusContact = (contactId, favorite) => {
  try {
    return Contacts.findByIdAndUpdate({ _id: contactId }, favorite);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
