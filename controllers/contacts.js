const contactsService = require("../services/mongodb");
const Contact = require("../services/schemas/contact");
const getContacts = async (req, res, next) => {
  try {
    res.json(await contactsService.getContacts());
  } catch (e) {
    console.log(e.message);
    next(e);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contact = await contactsService.getContactById(req.params.contactId);
    if (contact) {
      res.json(contact);
      return;
    }
    res.status(404).json({ message: "Not found" });
  } catch (e) {
    console.log(e.message);
    next(e);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contact = { name: req.body.name, email: req.body.email, phone: req.body.phone };
    if (req.body.favorite) {
      contact.favorite = req.body.favorite;
    }
    const addResult = await contactsService.addContact(contact);
    res.status(addResult.name ? 201 : 400).json(addResult);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const removed = await contactsService.deleteContact(req.params.contactId);
    if (removed) {
      res.json({ message: "contact deleted" });
      return;
    }
    res.status(404).json({ message: "Not found" });
  } catch (e) {
    console.log(e.message);
    next(e);
  }
};

const isContactInvalid = (contact) => {
  const newContact = new Contact(contact);
  const validationError = newContact.validateSync();
  if (validationError) {
    return { message: validationError.message };
  }
  return false;
};

const prepareContact = (contact) => {
  const newContact = new Contact(contact);
  const { _id, ...preparedContact } = newContact.toObject();
  return preparedContact;
};

const updateContact = async (req, res, next) => {
  try {
    const contact = { name: req.body.name, email: req.body.email, phone: req.body.phone };
    if (req.body.favorite !== undefined) {
      contact.favorite = req.body.favorite;
    }

    const contactInvalidity = isContactInvalid(contact);
    if (contactInvalidity) {
      res.status(400).json(contactInvalidity);
    }

    const updateResult = await contactsService.updateContact(
      req.params.contactId,
      prepareContact(contact)
    );
    if (updateResult.name) {
      res.status(200).json(updateResult);
      return;
    }
    res.status(404).json(updateResult);
    return;
  } catch (e) {
    console.log(e.message);
    next(e);
  }
};

const setFavorite = async (req, res, next) => {
  try {
    const isFavorite = req.body.favorite;
    if (isFavorite === undefined) {
      res.status(400).json({ message: "missing field favorite" });
      return;
    }
    const patchResult = await contactsService.updateContact(req.params.contactId, {
      favorite: isFavorite,
    });
    res.status(patchResult.name === undefined ? 404 : 200).json(patchResult);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  setFavorite,
};
