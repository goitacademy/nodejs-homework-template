const Contact = require("./schema/contactsSchema");
const { NotAutorizedError, NotFoundError } = require("../helpers/errors");

const getContacts = (owner) => {
  const contact = Contact.find({ owner });
  if (!contact) {
    throw new NotFoundError("Contacts not found");
  }
  if (!owner) {
    throw new NotAutorizedError("Please authorize");
  }
  return contact;
};

const getContactById = (id, owner) => {
  const contact = Contact.findOne({ _id: id, owner });
  if (!owner) {
    throw new NotAutorizedError("Please authorize");
  }
  return contact;
};

const createContact = ({ name, email, phone, favorite }, owner) => {
  const contact = Contact.create({ name, email, phone, favorite, owner });
  if (!owner) {
    throw new NotAutorizedError("Please authorize");
  }
  return contact;
};

const updateContact = (id, body, owner) => {
  const contact = Contact.findByIdAndUpdate({ _id: id, owner }, body, {
    new: true,
  });
  if (!owner) {
    throw new NotAutorizedError("Please authorize");
  }
  return contact;
};

const removeContact = (id, owner) => {
  const contact = Contact.findByIdAndRemove({ _id: id, owner });
  if (!owner) {
    throw new NotAutorizedError("Please authorize");
  }
  return contact;
};

const updateStatusContact = (id, body, owner) => {
  const contact = Contact.findByIdAndUpdate({ _id: id, owner }, body, {
    new: true,
  });
  if (!owner) {
    throw new NotAutorizedError("Please authorize");
  }
  return contact;
};
module.exports = {
  getContacts,
  createContact,
  getContactById,
  updateContact,
  removeContact,
  updateStatusContact,
};
