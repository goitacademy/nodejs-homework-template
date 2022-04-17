// const Contacts = require("../../repository/index");
const { HTTP_STATUS_CODE } = require("../../libs/constant");
const { CustomError } = require("../../middleware/error-handler");
const contactMethod = require("../../repository/index");
const { listContacts } = contactMethod.listContacts;
const { getContactById } = contactMethod.getContactById;
const { addContact } = contactMethod.addContact;
const { removeContact } = contactMethod.removeContact;
const { updateContact } = contactMethod.updateContact;

class ContactsService {
  async getAll(query, user) {
    const contacts = await listContacts(query, user);
    return contacts;
  }

  async getById(id, user) {
    const contact = await getContactById(id, user);
    if (!contact) {
      throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, "Not Found");
    }
    return contact;
  }

  async create(body, user) {
    const contact = await addContact(body, user);
    return contact;
  }

  async update(id, body, user) {
    const contact = await updateContact(id, body, user);
    if (!contact) {
      throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, "Not Found");
    }
    return contact;
  }

  async remove(id, user) {
    const contact = await removeContact(id, user);
    if (!contact) {
      throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, "Not Found");
    }
    return contact;
  }
}

module.exports = new ContactsService();
