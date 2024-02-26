import { Contact } from "./schemas/contacts.js";
import { User } from "./schemas/users.js";

const getAllContacts = async ({ owner }) => {
  return Contact.find({ owner });
};

const getContactById = async ({ owner, id }) => {
  return Contact.findOne({ _id: id, owner });
};

const getContactByName = async (name, userId) => {
  return Contact.findOne({ name: name, owner: userId });
};

const createContact = async ({ name, email, phone, favorite, owner }) => {
  return Contact.create({ name, email, phone, favorite, owner });
};

const updateContact = async ({ contactId, name, email, phone, owner }) => {
  const contact = await Contact.findOne({ _id: contactId, owner });
  if (!contact) {
    return null;
  }
  return await Contact.findByIdAndUpdate(
    { _id: contactId },
    { name, email, phone, owner },
    { new: true }
  );
};

const removeContact = async ({ owner, id }) => {
  return Contact.findByIdAndDelete({ _id: id, owner });
};

const updateStatusContact = async ({ contactId, favourite, owner }) => {
  return Contact.findByIdAndUpdate(
    { _id: contactId, owner, favourite },
    {
      new: true,
    }
  );
};

const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

const createUser = async ({ email, password }) => {
  const newUser = new User({ email });
  await newUser.setPassword(password);
  await newUser.save();
  return newUser;
};

const updateUser = async (id, token) => {
  const updateData = {
    $set: {
      token: token,
    },
  };
  await User.findByIdAndUpdate({ _id: id }, updateData, { new: true });
};

const findUserById = async (id) => {
  return User.findOne({ _id: id });
};

export {
  getAllContacts,
  getContactById,
  getContactByName,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
  findUserByEmail,
  createUser,
  updateUser,
  findUserById,
};
