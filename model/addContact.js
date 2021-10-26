const { v4: uuidv4 } = require("uuid");
const {
  isPhoneInContacts,
  isEmailInContacts,
  writeData,
} = require("./helpers");
const listContacts = require("./listContacts");
const validateContact = require("./validation");

const requiredFields = ["name", "email", "phone"];

const addContact = async (body) => {
  const { error } = validateContact(body, requiredFields);

  if (error) {
    const { message } = error.details[0];
    return { error: message, status: 400 };
  }

  const newContact = { id: uuidv4(), ...body };
  const contacts = await listContacts();

  if (
    (await isEmailInContacts(contacts, newContact.email)) ||
    (await isPhoneInContacts(contacts, newContact.phone))
  ) {
    return {
      error: "Contact with same email or phone already exists.",
      status: 400,
    };
  }

  contacts.push(newContact);

  await writeData(contacts);

  return newContact;
};

module.exports = addContact;
