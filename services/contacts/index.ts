const {
  listContacts,
  getContactById,
  addContact,
  checkContact,
  updateContact,
  removeContact,
} = require("../../repository/contacts");
const { HTTP_STATUS_CODE } = require("../../libs/constants");
const { CustomError } = require("../../middleware/error-handler");

class ContactsService {
  async getList(query, user) {
    const { limit = 20, page = 1, favorite: filter } = query;

    const result = await listContacts({ limit, page }, filter, user);

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
    const check = await checkContact(body, user);
    if (!check) {
      const contact = await addContact(body, user);
      return contact;
    }
    const { name, email, phone } = check;
    if (name === body.name) {
      throw new CustomError(
        HTTP_STATUS_CODE.BAD_REQUEST,
        `Contact ${name} is already in contacts`
      );
    }
    if (email === body.email) {
      throw new CustomError(
        HTTP_STATUS_CODE.BAD_REQUEST,
        `Contact ${email} is already in contacts`
      );
    }
    if (phone === body.phone) {
      throw new CustomError(
        HTTP_STATUS_CODE.BAD_REQUEST,
        `Contact ${phone} is already in contacts`
      );
    }
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
export {};
