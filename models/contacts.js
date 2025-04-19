const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // Walidacja email
    },
    phone: {
      type: String,
      required: true,
      match: [/^\+?[0-9\s-]+$/, "Invalid phone number"], // Walidacja numeru
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const Contact = model("Contact", contactSchema);

const listContacts = async (filter = {}, skip = 0, limit = 20) => {
  try {
    return await Contact.find(filter).skip(skip).limit(limit);
  } catch (error) {
    throw error;
  }
};
const getContactById = async (contactId, owner) => {
  return await Contact.findOne({ _id: contactId, owner });
};

const removeContact = async (contactId, owner) => {
  return await Contact.findOneAndRemove({ _id: contactId, owner });
};

const addContact = async (body, owner) => {
  return await Contact.create({ ...body, owner });
};

const updateContact = async (contactId, body, owner) => {
  return await Contact.findOneAndUpdate({ _id: contactId, owner }, body, {
    new: true,
  });
};

const updateStatusContact = async (contactId, { favorite }, owner) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { favorite },
    { new: true }
  );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
  Contact,
};
