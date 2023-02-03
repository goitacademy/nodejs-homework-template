const { Contact } = require("../db/contactsModel");
const {WrongParametersError} = require("../helpers/errors");

const getContacts = async (owner) => {    
  const contacts = await Contact.find({owner});  
  return contacts;
};

const getContactById = async (id, owner) => {
  const contact = await Contact.findOne({_id: id, owner});
  if (!contact) {
    throw new WrongParametersError(`Not found such id ${id}`);
  }
  return contact;
};

const addContact = async ({ name, phone, email, favorite }, owner) => {
  const contact = new Contact({ name, phone, email, favorite, owner });
  await contact.save();
  return contact;
};
const deleteContactById = async (id, owner) => {
  const contact = await Contact.findOneAndRemove({_id: id, owner});
  if (!contact) {
    throw new WrongParametersError(`Not found such id ${id}`);
  }
};
const putContactById = async (id, { name, email, phone }, owner) => {
  await Contact.findOneAndUpdate({_id: id, owner}, { $set: { name, email, phone } });
};
const updateStatusContactById = async (id, { favorite }, owner) => {
  const contact = await Contact.findOneAndUpdate(
    {_id: id, owner},
    { $set: { favorite } },
    { new: true }
  );
  return contact;
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContactById,
  putContactById,
  updateStatusContactById,
};
