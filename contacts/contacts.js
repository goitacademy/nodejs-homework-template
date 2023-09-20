const readJsonFiles = require("../untils/readJsonFiles");
const writeJsonFile = require("../untils/writeJsonFile");
const path = require("path");
const { nanoid } = require("nanoid");
const ERROR_TYPES = require("../adapters/express/contastants/errorTypes");
const createError = require("../untils/createError");
const Contact = require("./models/contactModel");
const CONTACTS_PATH = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const result = await Contact.find({});
  return result;
};

const getContactById = async (contactId) => {
  const result = await Contact.findById(contactId);
  if (!result) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: `Not found`,
      data: {},
    });
    throw error;
  }
  return result;
};

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    const error = createError(ERROR_TYPES.NOT_FOUND, {
      message: `Not found`,
      data: {},
    });
    throw error;
  }
  return "contact deleted";
};

const addContact = async (body) => {
  const contact = new Contact(body);
  contact.save();
  return contact;
};

const updateContact = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(contactId, {
    $set: {
      ...body,
    },
  },
  { returnOriginal: false },
)
  .where('deletedAt')
  .equals(null);

if (!contact) {
  const error = createError(ERROR_TYPES.NOT_FOUND, {
    message: `Animal with id ${contactId} not found`,
    data: {},
  });
  throw error;
}
return contact
  // const contactList = await listContacts();
  // const { name, email, phone } = body;
  // const changeContactIndex = contactList.findIndex((e) => e.id === contactId);
  // const changeContact = contactList[changeContactIndex];
  // if (changeContactIndex === -1) {
  //   const error = createError(ERROR_TYPES.NOT_FOUND, {
  //     message: `Not found`,
  //     data: {},
  //   });
  //   throw error;
  // }
  // contactList[changeContactIndex] = {
  //   ...changeContact,
  //   name: name || changeContact.name,
  //   email: email || changeContact.email,
  //   phone: phone || changeContact.phone,
  // };
  // await writeJsonFile(CONTACTS_PATH, contactList);
  return contact
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
