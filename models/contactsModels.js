const { Schema, model } = require("mongoose");

const contactSchema = Schema(
  {
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
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

const listContacts = async () => {
  try {
    const result = await Contact.find({});
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const result = await Contact.findById(contactId);

    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const result = await Contact.create({ name, email, phone });
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const result = Contact.findByIdAndUpdate({ _id: contactId }, body, {
      new: true,
    });
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const result = await Contact.findByIdAndRemove({ _id: contactId });
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContactElement = async (contactId, body) => {
  try {
    const result = Contact.findByIdAndUpdate({ _id: contactId }, body, {
      new: true,
    });
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactElement,
};