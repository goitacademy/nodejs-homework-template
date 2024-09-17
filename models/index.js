const HttpError = require("../Helpers/HttpError");
const Contacts = require("./schemas/contacts");

const listContacts = async () => {
  const resp = await Contacts.find();
  return resp;
};

const getContactById = async (id) => {
  const resp = await Contacts.findById(id);
  if (!resp) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }
  // const contacts = await listContacts();
  // const result = contacts.find((contact) => contact.id === contactId);
  return resp || null;
};

const addContact = async (body) => {
  const newContact = {
    ...body,
  };
  const result = await Contacts.create(newContact);
  // const contacts = await listContacts();
  // const newContact = {
  //   id: nanoid(),
  //   ...body,
  // };
  // const newList = [...contacts, newContact];
  // await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));
  return result;
};

const removeContact = async (id) => {
  const resp = await Contacts.findByIdAndRemove(id);
  // const contacts = await listContacts();
  // const index = contacts.findIndex((contact) => contact.id === id);
  // if (index === -1) {
  //   return null;
  // }
  // const [result] = contacts.splice(index, 1);
  // await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return resp;
};

const updateContact = async (id, body) => {
  const resp = await Contacts.findByIdAndUpdate(id, body, { new: true });
  if (!resp) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }
  // const contacts = await listContacts();
  // const index = contacts.findIndex((item) => item.id === id);
  // if (index === -1) {
  //   return null;
  // }
  // contacts[index] = { id, ...body };
  // await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return resp;
};

const setFaforited = async (id, body) => {
  const resp = await Contacts.findByIdAndUpdate(id, body, { new: true });
  if (!resp) {
    throw HttpError(404, `Contact with id ${id} not found`);
  }
  // const contacts = await listContacts();
  // const index = contacts.findIndex((item) => item.id === id);
  // if (index === -1) {
  //   return null;
  // }
  // contacts[index] = { id, faforited: true };
  // await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return resp;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  setFaforited,
};
