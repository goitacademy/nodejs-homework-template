const { model, Schema } = require("mongoose");

const contactSchema = new Schema(
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Contact = model("Contact", contactSchema);

const listContacts = async (ownerId) => {
  try {
    const contacts = await Contact.find({ owner: ownerId });
    console.log("contacts", contacts)
    return contacts;
  } catch (error) {
    console.error(error.massage);
    return [];
  }
};

const getContactById = async (contactId, ownerId) => {
  try {
    console.log("Searching for contact with ID:", contactId);
    const contact = await Contact.findOne({ _id: contactId, owner: ownerId });
    console.log("Result:", contact);
    return contact || null;
  } catch (err) {
    console.error(err.massage);
    return null;
  }
};

const removeContact = async (contactId, ownerId) => {
  try {
    const removedContact = Contact.findOneAndDelete({ _id: contactId, owner: ownerId });
    if (!removedContact) {
      console.warn("Contact not found");
      return null;
    }
    return removedContact;
  } catch (err) {
    console.error(err.massage);
    return null;
  }
};

const addContact = async (body, ownerId) => {
  try {
    const newContact = await Contact.create({ ...body, owner: ownerId });
    return newContact;
  } catch (err) {
    console.error(err.massage);
    return null;
  }
};

const updateContact = async (contactId, body, ownerId) => {
  try {
    const updatedContact = Contact.findByIdAndUpdate(
      { _id: contactId, owner: ownerId },
      { $set: body },
      { new: true }
    );
    if (!updatedContact) {
      console.warn("Contact not found");
      return null;
    }
    return updatedContact;
  } catch (err) {
    console.error(err.massage);
    return null;
  }
};

const updateStatusContact = async (contactId, { favorite }, ownerId) => {
  try {
    // const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(
      { _id: contactId, owner: ownerId },
      { $set: { favorite } },
      { new: true }
    );
    if (!updatedContact) {
      console.warn("Contact not found");
      return null;
    }
    return updatedContact;
  } catch (err) {
    console.error(err.massage);
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  contactSchema,
  updateStatusContact,
};