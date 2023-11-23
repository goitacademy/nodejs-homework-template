const Contact = require("./schemas/contact");

const listContacts = async (page, limit) => {
  try {
    const contacts = await Contact.find()
      .skip(limit * page)
      .limit(limit);

    return contacts;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const addContact = async (body) => {
  try {
    const newContact = new Contact(body);
    const savedContact = await newContact.save();
    return savedContact;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const removeContact = async (contactId) => {
  try {
    const ret = await Contact.findByIdAndDelete(contactId);
    return ret;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const ret = await Contact.findByIdAndUpdate(contactId, body, {
      // Aby zwrócić kontakt PO aktualizacji, należy użyć flagi "new"
      new: true,
    });
    return ret;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const updateStatusContact = async (contactId, body) => {
  // Kod jest taki sam jak w metodzie updateContact,
  // ale w wymaganiach było, aby utworzyć metodę `updateStatusContact`
  // Normalnie bym zrobiła jedną funkcję :)
  try {
    const ret = await Contact.findByIdAndUpdate(contactId, body, {
      // Aby zwrócić kontakt PO aktualizacji, należy użyć flagi "new"
      new: true,
    });
    return ret;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
