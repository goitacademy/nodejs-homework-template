const Contacts = require("./contact");

const listContacts = async () => {
  const contacts = await Contacts.find();
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = await Contacts.findById(contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const delContact = await Contacts.findById(contactId);
  const ERROR_MESSAGE = "Номер с таким id не найден";

  if (delContact) {
    await Contacts.deleteOne(delContact);
    return "Контакт удален";
  } else {
    return ERROR_MESSAGE;
  }
};

const addContact = async (body) => {
  const contacts = await Contacts.find();

  const ERROR_MESSAGE = "Такой контакт уже существует";

  if (contacts.some((item) => item.phone === body.phone)) {
    return ERROR_MESSAGE;
  } else {
    await Contacts.create(body);
    return body;
  }
};

const updateContacts = async (contactId, body) => {
  const contact = await Contacts.findById(contactId);
  if (contact) await Contacts.findByIdAndUpdate(contactId, body);
  else return "Контакт который Вы хотите изменить не найден";
};

const updateStatusContact = async (contactId, body) => {
  const contact = await Contacts.findByIdAndUpdate(
    contactId,
    { favorite: body.favorite },
    { new: true }
  );
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
  updateStatusContact,
};
