const { contact } = require("../models/contacts.js");

class ContactsController {
  async listContacts(req, res) {
    const { _id } = req.user;
    const { page = 1, limit = 10, favorite = false } = req.query;
    const skip = (page - 1) * limit;
    const params = {
      owner: _id,
    };
    const secparams = {
      skip,
      limit: Number(limit),
    };
    if (favorite) {
      params.favorite = favorite;
      secparams.favorite = favorite;
    }
    findq(params, secparams);
    async function findq(params, secparams) {
      const contacts = await contact.find(params, "", secparams);
      return res.json({ status: "success", code: 200, payload: { contacts } });
    }
  }

  async getContactById(req, res) {
    try {
      const thisContact = await contact.findById(req.params.contactId);
      return res.json({
        status: "success",
        code: 200,
        payload: { thisContact },
      });
    } catch (error) {
      return res
        .status(404)
        .json({ status: "error", code: 404, message: "Not Found" });
    }
  }

  async addContact(req, res) {
    try {
      const { _id } = req.user;
      const newContact = await contact.create({ ...req.body, owner: _id });

      return res
        .status(201)
        .json({ status: "success", code: 201, payload: { newContact } });
    } catch (error) {
      return res
        .status(400)
        .json({ status: "error", code: 400, message: "Not Found" });
    }
  }

  async updateContact(req, res) {
    try {
      const updatedContact = await contact.findByIdAndUpdate(
        req.params.contactId,
        req.body,
        { new: true }
      );
      return res.json({
        status: "success",
        code: 200,
        payload: { updatedContact },
      });
    } catch (error) {
      res
        .status(400)
        .json({ status: "error", code: 400, message: "Not Found" });
    }
  }

  async patchContact(req, res) {
    try {
      if (!req.body) {
        return res.status(400).json({ message: "missing field favorite" });
      }
      const updatedContact = await contact.findByIdAndUpdate(
        req.params.contactId,
        req.body,
        { new: true }
      );
      return res.json({
        status: "success",
        code: 200,
        payload: { updatedContact },
      });
    } catch (error) {
      res
        .status(400)
        .json({ status: "error", code: 400, message: "Not Found" });
    }
  }

  async removeContact(req, res) {
    try {
      const deletedContact = await contact.findByIdAndDelete(
        req.params.contactId
      );
      return res.json({
        status: "success",
        code: 200,
        payload: { deletedContact },
      });
    } catch (error) {
      return res
        .status(404)
        .json({ status: "error", code: 404, message: "Not Found" });
    }
  }
}

module.exports = new ContactsController();
