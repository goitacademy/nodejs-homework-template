const { Contact } = require("./schemas/contact.schema");

const listContacts = async (ownerId) => {
  try {
    const contacts = await Contact.find({ owner: ownerId });
    return contacts;
  } catch (error) {
    console.log("Reading contact list error:", error.message);
    throw error;
  }
};

const getContactById = async (contactId, ownerId) => {
  try {
    const contactToFindById = await Contact.findOne({
      _id: contactId,
      owner: ownerId,
    });
    return contactToFindById;
  } catch (error) {
    console.log("Getting contact by id error:", error.message);
  }
};

const removeContact = async (contactId, ownerId) => {
  try {
    const contactToRemove = await Contact.findByIdAndDelete({
      _id: contactId,
      owner: ownerId,
    });
    return contactToRemove;
  } catch (error) {
    console.log("Removing contact error:", error.message);
  }
};

const addContact = async (body, ownerId) => {
  try {
    const newContact = await Contact.create({ ...body, owner: ownerId });
    return newContact;
  } catch (error) {
    console.log("Adding contact error:", error.message);
  }
};

const updateContact = async (contactId, body, ownerId) => {
  try {
    const contactToUpdate = await Contact.findByIdAndUpdate(
      { _id: contactId, owner: ownerId },
      body,
      { new: true }
    );
    return contactToUpdate;
  } catch (error) {
    console.error("Updating contact error:", error.message);
  }
};
const updateStatusContact = async (contactId, body, ownerId) => {
  try {
    const contactToUpdate = await Contact.findByIdAndUpdate(
      { _id: contactId, owner: ownerId },
      { favorite: body.favorite },
      { new: true }
    );
    return contactToUpdate;
  } catch (error) {
    console.error("Updating contact error:", error.message);
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
