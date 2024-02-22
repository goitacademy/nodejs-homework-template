import { Contact } from "./schemas/contacts.js";
import { User } from "./schemas/users.js";

const getAllContacts = async () => {
  return Contact.find();
};

const getContactById = async (id) => {
  return Contact.findOne({ _id: id });
};

const getContactByName = async (name) => {
  return Contact.findOne({ name: name });
};

const createContact = async ({ name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite });
};

const updateContact = async (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const removeContact = async (id) => {
  return Contact.findByIdAndDelete({ _id: id });
};

const updateStatusContact = async (id, favourite) => {
  return Contact.findByIdAndUpdate({ _id: id }, favourite, { new: true });
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
