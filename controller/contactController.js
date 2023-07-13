const HttpError = require("../error/errorHandler");
const ContactService = require("../service/ContactService");
const Contact = require("../models/contacts");
class ContactController {
  async create(req, res, next) {
    try {
      const { _id } = req.user;
      const { body } = req;
      const created = await ContactService.addContact(body, _id);
      res.status(201).json(created);
    } catch (error) {
      next(error);
      res.status(400);
    }
  }

  async read(req, res, next) {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;
    const filter = favorite ? { owner, favorite } : { owner };
    const result = await Contact.find(filter, "-createdAt -updatedAt", {
      skip,
      limit,
      favorite,
    }).populate("owner", "name email subscription");
    res.json(result);
  }

  async update(req, res, next) {
    try {
      const body = req.body;
      const contactId = req.params.contactId;
      const contactUpdate = await ContactService.updateContact(contactId, body);
      console.log(contactUpdate);
      if (!contactUpdate) {
        return res.status(404).json({ message: "Not found" });
      }
      res.status(200).json(contactUpdate);
    } catch (error) {
      next(error);
    }
  }

  async deleted(req, res, next) {
    try {
      const { contactId } = req.params;
      const result = await ContactService.removeContact(contactId);
      if (!result) {
        return res.status(404).json({ message: "Not found" });
      }
      res.json({ message: "contact deleted" });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { contactId } = req.params;
      const result = await ContactService.getContactById(contactId);
      if (!result) {
        res.status(404).json({ message: "Not found" });
      }
      res.status(200).json(result);
    } catch (error) {
      return HttpError(500, error.message);
    }
  }

  async updateStatusFavoriteContact(req, res, next) {
    try {
      console.log(req.params.contactId);
      const contact = await ContactService.updateContact(
        req.params.contactId,
        req.body
      );
      if (contact) {
        return res.status(200).json(contact);
      }
      return res.status(404).json({ message: "Not Found" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ContactController();
