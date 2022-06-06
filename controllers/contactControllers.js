const contactService = require('../services');

const getAll = async (req, res, next) => {
  try {
    const all = await contactService.listContacts();
    res.json(all);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactService.getContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" })
    }
    else {
      return res.json(contact)
    }
  } catch (e) {
    next(e);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await contactService.addContact(name, email, phone);
    if (!newContact) {
      res.status(404).json({ message: "This name or number already exists" })

    } else {

      return res.status(201).json(newContact)
    }
  } catch (e) {
    next(e)
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removeContact = await contactService.removeContact(contactId);

    if (!removeContact) {
      res.status(404).json({ message: "Not found" })
    } else {
      res.status(200).json({ "message": "contact deleted" })
    }
  } catch (e) {
    next(e);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const upadateContact = await contactService.updateContact(contactId, req.body)

    if (!upadateContact) {
      res.status(404).json({ message: "Not found" })
    } else {
      return res.json(upadateContact)
    }
  } catch (e) {
    next(e);
  }
}

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const upadateContact = await contactService.updateContact(contactId, req.body)

    if (!upadateContact) {
      res.status(404).json({ message: "Not found" })
    } else {
      return res.json(upadateContact)
    }
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getAll,
  getById,
  deleteById,
  createContact,
  updateById,
  updateStatusContact
}