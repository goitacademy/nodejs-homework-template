const ContactsModel = require("../models/contacts");

class ContactsService {
  constructor() {
    this.model = ContactsModel;
  }
  getContacts = async (filter, skip, limit) => {
    const contacts = await this.model.find(
      { ...filter },
      "name phone email favorite",
      { skip, limit }
    );

    return contacts || null;
  };

  getContact = async (id) => {
    return (await this.model.findById(id)) || null;
  };

  deleteContact = async (id) => {
    return (await this.model.findByIdAndDelete(id)) || null;
  };

  createContact = async (body) => {
    return (await this.model.create(body)) || null;
  };

  updateContact = async (contactId, body) => {
    const updatedContact = await this.model.findByIdAndUpdate(
      contactId,
      { ...body },
      { new: true, runValidators: true }
    );

    return updatedContact || null;
  };

  updateStatusContact = async (contactId, body) => {
    const updatedStatusContact = await this.model.findByIdAndUpdate(
      contactId,
      { ...body },
      { new: true, runValidators: true }
    );

    return updatedStatusContact || null
  };
}

module.exports = new ContactsService();
