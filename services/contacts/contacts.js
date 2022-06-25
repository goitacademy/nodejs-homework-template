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
    const { limit = 5, skip = 0, sortBy, sortByDesc, filter } = query;
    let sortCriteria = null;
    let select = null;
    if (sortBy) {
      sortCriteria = { [sortBy]: 1 };
    }
    if (sortByDesc) {
      sortCriteria = { [sortByDesc]: -1 };
    }
    if (filter) {
      select = filter.split("|").join(" ");
    }
    const result = await listContacts(
      { limit, skip, sortCriteria, select },
      user
    );

    return result;
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
