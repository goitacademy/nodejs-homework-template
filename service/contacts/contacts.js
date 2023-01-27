const { Contact } = require("../../models/contact");
const { WrongParametersError } = require("../../helpers");

const getContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (id) => {
  const contactById = await Contact.findById(id);
  if (!contactById) {
    throw new WrongParametersError("Not found");
  }
  return contactById;
};

const addContact = async (body) => {
  const newContact = await Contact.create(body);
  return newContact;
};

const updateContact = async (id, body) => {
  const { name, phone, email, favorite } = body;
  await Contact.findByIdAndUpdate(id, {
    $set: { name, phone, email, favorite },
  });
  return Contact.findById(id);
};

const updateStatusContact = async (id, body) => {
  const { favorite } = body;
  if (!favorite) {
    throw new WrongParametersError("missing field favorite");
  }
  await Contact.findByIdAndUpdate(id, {
    $set: { favorite },
  });
  return Contact.findById(id);
};

const removeContactById = async (id) => {
  const removedContact = await Contact.findByIdAndRemove(id);
  if (removedContact === -1) {
    throw new WrongParametersError("Not found");
  }
  return getContacts();
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContactById,
};
