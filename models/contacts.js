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
    const data = await Contacts.find();

    return data;
  } catch (error) {
    console.error("An error occurred");
  }
};

const getContactById = async (contactId) => {
  try {
    const foundContact = Contacts.findOne({ _id: contactId });

    return foundContact;
  } catch (error) {
    console.error("An error occurred");
  }
};

const removeContact = async (contactId) => {
  try {
    const deletedContact = await Contacts.findByIdAndDelete({ _id: contactId });

    return deletedContact;
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

    const result = newContact.save();
    return result;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    await Contacts.findByIdAndUpdate({ _id: contactId }, body);
    const updatedContact = await getContactById(contactId);
    return updatedContact;
  } catch (error) {
    console.error(error);
  }
};
const updateStatusContact = async (contactId, favorite) => {
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
