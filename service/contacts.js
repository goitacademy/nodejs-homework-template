const { isValidObjectId } = require("mongoose");
const Contact = require("./schemas/contacts");

const getAllContacts = async (owner) => {
  try {
    const contacts = await Contact.find({ owner });
    return contacts;
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId, userId) => {
  if (!isValidObjectId(contactId)) {
    throw new Error("Not found. Invalid Id!");
  }
  try {
    const selectedConctact = await Contact.findOne({ _id: contactId, owner });
    const contactOwner = selectedConctact.owner;

    if (userId.toString() !== contactOwner.toString()) {
      throw new Error("Not authorized");
    }
    return selectedConctact;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body, userId) => {
  if (!isValidObjectId(contactId)) {
    throw new Error("Not found. Invalid Id!");
  }
  try {
    const selectedContact = await Contact.findOne({ _id: contactId });
    const contactOwner = selectedContact.owner;

    if (userId.toString() !== contactOwner.toString()) {
      throw new Error("Not authorized.");
    }

    await Contact.findByIdAndUptade(contactId, body);
    const updatedContact = (await Contact.findOne({ _id: contactId })) || null;
    return updatedContact;
  } catch (error) {
    throw error;
  }
};

const updateStatusContact = async (contactId, body, userId) => {
  if (!isValidObjectId(contactId)) {
    throw new Error("Not found. Invalid Id!");
  }
  try {
    const selectedContact = await Contact.findOne({ _id: contactId });
    const contactOwner = selectedContact.owner;

    if (userId.toString() !== contactOwner.toString()) {
      throw new Error("Not authorized.");
    }

    const { favorite } = body;
    await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
    const updatedContact = (await Contact.findOne({ _id: contactId })) || null;
    return updatedContact;
  } catch (error) {
    throw error;
  }
};

const createContact = async (body, owner) => {
  try {
    const newContact = await Contact.create({ ...body, owner });
    return newContact;
  } catch (error) {
    throw error;
  }
};

const deleteContact = async (contactId, userId) => {
  if (!isValidObjectId(contactId)) {
    throw new Error(" Not found. Invalid Id!");
  }
  try {
    const deletedContact =
      (await Contact.findByIdAndDelete({ _id: contactId })) || null;
    const contactOwner = deletedContact;

    if (userId.toString() !== contactOwner.toString()) {
      throw new Error("Not sauthorized");
    }

    return deletedContact;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  updateStatusContact,
  deleteContact,
};
