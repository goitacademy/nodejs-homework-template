const { NotFound, BadRequest } = require("http-errors");

const { Contact } = require("../models");

const { joiSchema } = require("../models/contactModel");

const getContacts = async () => {
  const contacts = await Contact.find({}, "_id name email phone favorite");
  return contacts;
};

const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new NotFound();
  }

  return contact;
};

const addContact = async (body) => {
  const { error } = joiSchema.validate(body);

  if (error) {
    throw new BadRequest("missing required name field");
  }

  const newContact = await Contact.create(body);
  return newContact;
};

const changeContactById = async (id, body) => {
  const { error } = joiSchema.validate(body);

  if (error) {
    throw new BadRequest("missing fields");
  }

  const updateContact = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });

  if (!updateContact) {
    throw new NotFound();
  }

  return updateContact;
};

const patchContact = async (id, { favorite }) => {

  const updateContact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    {
      new: true,
    }
  );

  if (!updateContact) {
    throw new NotFound();
  }

  return updateContact;
};

const deleteContactById = async (id) => {
  const deleteContact = await Contact.findByIdAndRemove(id);

  if (!deleteContact) {
    throw new NotFound();
  }

  return deleteContact;
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  changeContactById,
  patchContact,
  deleteContactById,
};
