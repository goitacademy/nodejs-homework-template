
const shortid = require("shortid");
const { Contact } = require("../routes/api/contacts.model");


const listContacts = async () => {
  try {
    return Contact.find();
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = Contact.findById(contactId);
    if (!data) {
      return null;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    return Contact.findByIdAndRemove(contactId);
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone, favorite) => {
  try {
    const newCont = {
      name,
      email,
      phone,
      favorite,
      id: shortid.generate(),
    };

    const existingCont = await Contact.findOne({ email });
    if (existingCont) {
      throw new Error("Contact already posted");
    }
    return Contact.create(newCont);
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    return Contact.findOneAndUpdate(contactId, body);
  } catch (error) {
    console.log(error);
  }
};

const updateStatusContact = async (contactId,  body) => {
  try {
    return Contact.findByIdAndUpdate(contactId, body, { new: true });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateStatusContact,
  updateContact,
};
