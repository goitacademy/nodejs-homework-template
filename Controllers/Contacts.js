const modelContacts = require("../models/contacts");
const createError = require("../helpers");
const constactsSchema = require("../Schemas/Schema");

class Contacts {
  async listContacts(req, res, next) {
    try {
      const result = await modelContacts.listContacts();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getContactById(req, res, next) {
    try {
      const { contactId } = req.params;
      const result = await modelContacts.getContactById(contactId);
      if (!result) {
        throw createError(404);
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async addContact(req, res, next) {
    try {
      const { error } = constactsSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: "missing required name field" });
        return;
      }
      const result = await modelContacts.addContact(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async removeContact(req, res, next) {
    try {
      const { contactId } = req.params;
      const result = await modelContacts.removeContact(contactId);
      if (!result) {
        throw createError(404);
      }

      res.status(201).json({ message: "Contact deleted" });
    } catch (error) {
      next(error);
    }
  }

  async updateContact(req, res, next) {
    try {
      const { error } = constactsSchema.validate(req.body);
      if (error) {
        res.status(400).json({ message: "missing fields" });
        return;
      }
      const { contactId } = req.params;
      const result = await modelContacts.updateContact(contactId, req.body);
      if (!result) {
        throw createError(404);
      }
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Contacts();
