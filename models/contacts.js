const { Contact } = require("../db/contactsModel");

const listContacts = async (filter, { skip, limit }) => {
  const data = await Contact.find({ ...filter })
    .select({ __v: 0 })
    .skip(skip)
    .limit(limit);
  return data;
};

const getContactById = async (contactId, ownerId) => {
  try {
    const contact = await Contact.find({ _id: contactId, owner: ownerId });
    return contact;
  } catch (error) {
    return error;
  }
};

const removeContact = async (contactId, ownerId) => {
  try {
    const contact = await Contact.findOneAndDelete({
      _id: contactId,
      owner: ownerId,
    });

    return contact;
  } catch (error) {
    return error.message;
  }
};

const addContact = async (body) => {
  try {
    const contact = new Contact(body);
    await contact.save();

    return contact;
  } catch (error) {
    return error.message;
  }
};

const updateContact = async (contactId, body, ownerId) => {
  try {
    const { name, email, phone } = body;

    await Contact.findOneAndUpdate(
      { _id: contactId, owner: ownerId },
      {
        $set: { name, email, phone },
      }
    );
    const contact = await Contact.find({ _id: contactId, owner: ownerId });

    return contact;
  } catch (error) {
    return error;
  }
};

const updateStatusContact = async (contactId, body, ownerId) => {
  try {
    const { favorite } = body;

    await Contact.findOneAndUpdate(
      { _id: contactId, owner: ownerId },
      {
        $set: { favorite },
      }
    );
    const contact = await Contact.find({ _id: contactId, owner: ownerId });

    return contact;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
