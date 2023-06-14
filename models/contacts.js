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
});

const listContacts = async () => {
  try {
    return await Contacts.find();
  } catch (error) {
    console.error("An error occurred");
  }
};

const getContactById = async (contactId) => {
  try {
    return await Contacts.findOne({ _id: contactId });
  } catch (error) {
    console.error("An error occurred");
  }
};

const removeContact = async (contactId) => {
  try {
    return await Contacts.findByIdAndDelete({ _id: contactId });
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone, favorite } = body;
    const newContact = new Contacts({
      name: name,
      email: email,
      phone: phone,
      favorite: favorite,
    });

    return await newContact.save();
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    return await Contacts.findByIdAndUpdate({ _id: contactId }, body, {
      new: true,
    });
  } catch (error) {
    console.error(error);
  }
};
const updateStatusContact = async (contactId, favorite) => {
  try {
    return await Contacts.findByIdAndUpdate({ _id: contactId }, favorite);
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
