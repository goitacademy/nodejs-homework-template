const { Contact } = require("../models");
const { WrongParametersError } = require("../helpers");

const getContacts = async (id) => {
  const contacts = await Contact.find({ owner: id });
  return contacts;
};

const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, owner: userId });
  if (!contact) {
    throw new WrongParametersError(
      `Failure, contact with id: ${contactId} was not found`
    );
  }
  return contact;
};

const addContact = async (body, userId) => {
  const user = new Contact({ ...body, owner: userId });
  await user.save();
  // await Contact.insertOne({...body, owner: userId});
};

const deleteContact = async (contactId, userId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
    owner: userId,
  });
  if (!contact) {
    throw new WrongParametersError(
      `Failure, contact with id: ${contactId} was not found`
    );
  }
  return contact;
};

const updateContact = async (contactId, body, userId) => {
  const contact = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: userId,
    },
    {
      $set: { ...body },
    },
    { returnDocument: "after" }
  );
  if (!contact) {
    throw new WrongParametersError(
      `Failure, contact with id: ${contactId} was not found`
    );
  }
  return contact;
};

const updateStatus = async (contactId, favorite, userId) => {
  const contact = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: userId,
    },
    {
      $set: { favorite },
    },
    { returnDocument: "after" }
  );
  if (!contact) {
    throw new WrongParametersError(
      `Failure, contact with id: ${id} was not found`
    );
  }
  return contact;
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateStatus,
};
