const contactsService = require("../services/contactsService");

const contactsController = {
  getContacts: async (req, res, next) => {
    try {
      const contacts = await contactsService.getContacts();
      res.json(contacts);
    } catch (error) {
      next(error);
    }
  },

  getContactById: async (req, res, next) => {
    try {
      const contact = await contactsService.getContactById(req.params.id);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.json(contact);
    } catch (error) {
      next(error);
    }
  },

  getFavoriteContacts: async (req, res, next) => {
    try {
      const contacts = await contactsService.getFavoriteContacts();
      res.json(contacts);
    } catch (error) {
      next(error);
    }
  },

  addContact: async (req, res, next) => {
    try {
      const newContact = await contactsService.addContact(req.body);
      res.status(201).json(newContact);
    } catch (error) {
      next(error);
    }
  },

  removeContact: async (req, res, next) => {
    try {
      const contact = await contactsService.removeContact(req.params.id);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.json({ message: "Contact deleted" });
    } catch (error) {
      next(error);
    }
  },

  updateContact: async (req, res, next) => {
    try {
      const updatedContact = await contactsService.updateContact(
        req.params.id,
        req.body
      );
      if (!updatedContact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.json(updatedContact);
    } catch (error) {
      next(error);
    }
  },

  toggleFavorite: async (req, res, next) => {
    const { favorite } = req.body;
    if (favorite === undefined) {
      return res.status(400).json({ message: "Missing field favorite" });
    }
    try {
      const updatedContact = await contactsService.toggleFavorite(
        req.params.contactId,
        favorite
      );
      if (!updatedContact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.json(updatedContact);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = contactsController;
