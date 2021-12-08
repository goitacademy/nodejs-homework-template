const { HTTP400Error, HTTP404Error } = require("../helpers/errorHandlers");
const {
  listContacts,
  getContactsByQuery,
  addContact,
  updateContact,
  removeContact,
  updateFavorite,
} = require("../services/contacts");

class Contacts {
  async getContactsList(req, res) {
    if (req.query.favorite) {
      const result = await getContactsByQuery("favorite");
      return res.json({ data: result, status: "success", code: 200 });
    }

    if (req.query.page) {
      const { page, limit } = req.query;
      const skip = (page - 1) * limit;
      const { _id } = req.user;
      const result = await listContactsPerPage(_id, skip, limit);

      return res.json({ data: result, status: "success", code: 200 });
    }

    const result = await listContacts();

    return res.json({ data: result, status: "success", code: 200 });
  }

  async getContactById(req, res) {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw new HTTP400Error("Bad Request, change query parameters");
    }
    return res.json({ data: result, status: "success", code: 200 });
  }

  async addContact(req, res) {
    const { _id } = req.user;
    console.log(_id);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.json({ message: "missing required  field" });
    }
    const result = await addContact({ name, email, phone, _id });

    return res.status(201).json({ data: result, status: "success", code: 201 });
  }

  async changeContact(req, res) {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.json({
        message: "missing fields",
        status: "failed",
        code: 400,
      });
    }

    const result = await updateContact(contactId, {
      name,
      email,
      phone,
    });
    if (!result) {
      throw new HTTP404Error(`There is no such contact with id: ${contactId}`);
    }
    return res.json({ data: result, status: "success", code: 200 });
  }

  async deleteContact(req, res) {
    const { contactId } = req.params;
    const removedContact = await removeContact(contactId);

    if (!removedContact) {
      throw new HTTP404Error(`There is no such contact with id: ${contactId}`);
    }

    return res.json({
      message: "contact deleted",
      status: "success",
      code: 200,
    });
  }

  async changeFavorite(req, res) {
    const { contactId } = req.params;
    const { favorite } = req.body;

    const result = await updateFavorite(contactId, { favorite });
    if (!result) {
      throw new HTTP404Error(`There is no such contact with id: ${contactId}`);
    }
    return res.json({ data: result, status: "success", code: 200 });
  }
}

module.exports = Contacts;
