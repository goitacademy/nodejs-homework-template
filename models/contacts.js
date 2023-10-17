const Contact = require("../schemas/contact");

const listContacts = async (ownerId) => {
  try {
    const data = await Contact.find({ owner: ownerId });
    return data;
  } catch (error) {
    console.error("database error:", error);
  }
};

const getContactById = async (contactId, ownerId) => {
  const findContact = (await Contact.findOne({
    _id: contactId,
    owner: ownerId,
  })) || {
    message: "contact, no found",
  };
  return findContact;
};

const addContact = async (body, ownerId) => {
  const newContact = await Contact.create(body);
  newContact.owner = ownerId;
  newContact.save();
  return newContact;
};
const removeContact = async (contactId, ownerId) => {
  const removedContact = await Contact.findOneAndRemove({
    _id: contactId,
    owner: ownerId,
  });
  const response = removedContact
    ? { removedContact, message: "Contact deleted" }
    : { message: "Contact, no found" };
  return response;
};

const updateContact = async (contactId, dataUpdate, ownerId) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: ownerId },
    dataUpdate,
    {
      new: true,
    }
  );
  const response = updatedContact
    ? { updatedContact, message: "Contact updated" }
    : { message: "Contact, no found" };
  return response;
};
const updateStatusContact = async (contactId, body, ownerId) => {
  const updatedStatus = await Contact.findOneAndUpdate(
    { _id: contactId, owner: ownerId  },
    body,
    {
      new: true,
    }
  );
  const response = updatedStatus
    ? { updatedStatus, message: "Favorite contact" }
    : { message: "Contact, no found" };
  return response;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
