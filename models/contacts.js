const Contact = require("./contactModel");

const listContacts = async (req, res) => {
  // const contacts = JSON.parse(await fs.readFile(contactsPath));
  // console.log(contacts);
  const contacts = await Contact.find().select("-__v");
  return contacts;
};

const getContactById = async (contactId) => {
  // const contacts = await listContacts();

  // const contactById = contacts.find(
  //   (contact) => String(contact.id) === String(contactId)
  // );

  const contactById = await Contact.findById(contactId);

  return contactById;
};

const removeContact = async (contactId) => {
  // const contacts = await listContacts();

  // const i = contacts.findIndex(
  //   (contact) => String(contact._id) === String(contactId)
  // );
  // if (i === -1) {
  //   return null;
  // }

  // const updateContacts = contacts.filter((_, idx) => idx !== i);
  // await fs.writeFile(contactsPath, JSON.stringify(updateContacts));

  // return contacts[i];

  const isRemoved = await Contact.findByIdAndDelete(contactId);
  return isRemoved;
};

const addContact = async (body) => {

  const newContact = await Contact.create(body);

  return newContact;
};

const updateContact = async (id, body) => {
  // const contacts = await listContacts();
  // const i = contacts.findIndex((contact) => String(contact.id) === String(id));
  // if (i === -1) {
  //   return null;
  // }
  // contacts[i] = {id , ...body};
  // await fs.writeFile(contactsPath, JSON.stringify(contacts));
  // return contacts[i];
  const updatedContact = await Contact.findByIdAndUpdate(id, {...body});
  console.log(updatedContact);
  return updatedContact;
};

const updateStatusContact = async (contactId, body) => {
  const { favorite } = body;

  const updatedStatusContact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
  console.log(updateStatusContact);

  return updatedStatusContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
};
