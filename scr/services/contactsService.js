const { Contacts } = require("../db/contactsModel");
const { WrongPramError } = require("../helpers/errors");

const getContacts = async (owner, { skip, limit }, favorite) => {
  const find = favorite === undefined ? { owner } : { owner, favorite };
  const data = await Contacts.find(find).skip(skip).limit(limit);
  return data;
};

const addContact = async ({ name, email, phone }, owner) => {
  const data = await Contacts.create({
    name,
    email,
    phone,
    owner,
  });
  return data;
};

const getContactById = async (id, owner) => {
  try {
    const data = await Contacts.findOne({ _id: id, owner });
    return data;
  } catch (error) {
    throw new WrongPramError("Not found");
  }
};

const deleteContactById = async (id, owner) => {
  try {
    await Contacts.findOneAndDelete({ _id: id, owner });
  } catch (error) {
    throw new WrongPramError("Not found");
  }
};

const putContactById = async (id, { name, email, phone }, owner) => {
  try {
    await Contacts.findOneAndUpdate({ _id: id, owner }, { name, email, phone });
    const data = await Contacts.findOne({ _id: id, owner });
    return data;
  } catch (error) {
    throw new WrongPramError("Not found");
  }
};

const updateStatusContact = async (id, favorite, owner) => {
  try {
    await Contacts.findOneAndUpdate({ _id: id, owner }, { favorite });
    const data = await Contacts.findOne({ _id: id, owner });
    return data;
  } catch (error) {
    throw new WrongPramError("Not found");
  }
};

module.exports = {
  getContacts,
  addContact,
  getContactById,
  deleteContactById,
  putContactById,
  updateStatusContact,
};
