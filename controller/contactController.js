const { closeSync } = require("fs");
const {
  addContact,
  listContacts,
  removeContact,
  updateContact,
  getContactById,
} = require("../models/contacts");
const HttpError = require("../error/errorHandler");

class ContactController {
  async create(req, res, next) {
    const created = await addContact(req.body);
    console.log(req.body);
    res.status(201).json(created);
  }

  async read(req, res, next) {//+
    const list = await listContacts();
    res.status(201).json(list);
  }

  async update(req, res, next) {
    const { contactId } = req.params;
    const result = await updateContact(contactId);
    if (!result) {
      return;
    }
    res.json(result);
  }

  async deleted(req, res, next) {//+
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      return;
    }
    res.json({ message: "contact deleted" });
  }

  async getById(req,res) {//+
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
       throw HttpError(404, "Not found");
    }
    res.json(result);
  }
}

module.exports = new ContactController();
