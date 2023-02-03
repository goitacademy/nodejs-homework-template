const {
  getAllContacts,
  getOneContact,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

class ContactsController {
  async addNewContact(req, res, next) {
    try {
      await addContact(req.body);
      res.status(201).json({ status: "success" });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    res.json(await getAllContacts());
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const contact = await getOneContact(id);
      if (!contact) {
        return res
          .status(404)
          .json({ message: `Contact with id:${id} not found` });
      }
      res.status(200).json(contact);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, email, phone } = req.body;
      if (!name && !email && !phone) {
        console.log("Out");
        return res.status(404).json({ message: "missing fields" });
      }
      await updateContact(id, req.body);
      res.status(200).json({ message: "Contact updated" });
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const contact = await getOneContact(id);
      if (!contact) {
        return res
          .status(404)
          .json({ message: `Contact with id:${id} not found` });
      }
      await removeContact(id);
      res.status(200).json({ message: "Contact deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ContactsController();
