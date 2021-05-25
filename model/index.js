const Contact = require("./schemas/contact");

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (e) {
    return e.message;
  }
};

const getContactById = async (contactId) => {
  try {
    if (contactId) {
      const contact = await Contact.findOne({ _id: contactId });
      return contact;
    }
  } catch (e) {
    return e.message;
  }
};

const removeContact = async (contactId) => {
  if (contactId) {
    try {
      const contact = await Contact.findByIdAndRemove({ _id: contactId });
      return contact;
    } catch (e) {
      return e.message;
    }
  }
};

const addContact = async (body) => {
  if (body) {
    try {
      const { favorite } = body;

      if (!favorite) {
        const newContact = {
          ...body,
          favorite: false,
        };
        return await Contact.create(newContact);
      }

      return await Contact.create(body);
    } catch (e) {
      return e.message;
    }
  }
};

const updateContact = async (contactId, body) => {
  if (contactId) {
    try {
      const updatedContact = await Contact.findByIdAndUpdate(
        { _id: contactId },
        { ...body },
        { new: true }
      );

      return updatedContact;
    } catch (e) {
      return e.message;
    }
  }
};

const updateStatusContact = async (contactId, body) => {
  if (contactId && body) {
    try {
      const updatedContact = await Contact.findByIdAndUpdate(
        { _id: contactId },
        { ...body },
        { new: true }
      );
      return updatedContact;
    } catch (e) {
      return e.message;
    }
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
