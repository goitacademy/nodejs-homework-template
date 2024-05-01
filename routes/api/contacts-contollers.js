const Joi = require("joi");
const nanoid = require("nanoid");

const contacts = require("../../models/contacts.json");

// funkcje pomocnicze
const listContacts = async () => {
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = contacts.find((c) => c.id === contactId);
  if (!contact) {
    throw new Error("Contact not found");
  }
  return contact;
};

const removeContact = async (contactId) => {
  console.log(contactId)
  const index = contacts.findIndex((c) => c.id === contactId);
  // c.id - identyfikator kontaktu w bieżącej iteracji
  // Jeśli żaden element nie spełnia tego warunku powyżej, to findIndex zwraca -1, co oznacza, że kontakt o podanym contactId nie istnieje w tablicy.
  if (index === -1) {
    throw new Error("Contact not found");
  }
  // usuwam jeden element, który jest pod wskazanym indeksem i zwracam tablicę z pierwszym i jedynym usuniętym elementem
  const removedContact = contacts.splice(index, 1)[0];
  return removedContact;
};

const addContact = async (body) => {
  const newContact = {
    id: nanoid.nanoid(),
    ...body,
  };
  contacts.push(newContact);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const index = contacts.findIndex((c) => c.id === contactId);
  if (index === -1) {
    throw new Error("Contact not found");
  }
  if (body.name) {
    contacts[index].name = body.name;
  }
  if (body.phone) {
    contacts[index].phone = body.phone;
  }
  if (body.email) {
    contacts[index].email = body.email;
  }
  return contacts[index];
};

// walidacja
const validateUpdateContact = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^[0-9]{9}$/),
  });
  return schema.validate(data);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  validateUpdateContact,
};
