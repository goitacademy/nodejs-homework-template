const Contact = require("../models/contact");
const contacts = require("../models/contacts.json");

const listContacts = async () => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find().skip(skip).limit(parseInt(limit));

    res.json(contacts);
  } catch (error) {
    console.error("Error listing contacts:", error);
    return [];
  }
};

const getContactById = async (contactId) => {
  try {
    return await Contact.findById(contactId);
  } catch (error) {
    console.error("Error getting contact by ID:", error);
    return null;
  }
};

const removeContact = async (contactId) => {
  try {
    const result = await Contact.deleteOne({ _id: contactId });
    return result.deletedCount > 0;
  } catch (error) {
    console.error("Error removing contact:", error);
    return false;
  }
};

const addContact = async (body) => {
  try {
    return await Contact.create(body);
  } catch (error) {
    console.error("Error adding contact:", error);
    return null;
  }
};

const updateContact = async (contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate(contactId, body, {
      new: true,
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    return null;
  }
};

async function updateStatusContact(contactId, body) {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite: body.favorite },
      { new: true }
    );

    return updatedContact;
  } catch (error) {
    throw new Error("Contact not found");
  }
}

const getFavoriteContacts = async (req, res, next) => {
  try {
    const { favorite } = req.query;

    const query = favorite ? { favorite: true } : {};

    const favoriteContacts = await Contact.find(query);

    res.json(favoriteContacts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
  getFavoriteContacts,
};
