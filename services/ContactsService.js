const ContactsModel = require("../models/contacts")

class ContactsService {
  constructor() {
    this.model = ContactsModel
  }
  getContacts = async (filter, skip, limit) => {
    const contacts = await this.model.find(
      ...filter,
      "name phone email favorite",
      {skip, limit}
    )
    return contacts || null
  }
}

module.exports = new ContactsService()