const service = require("../service/contacts.js");

const get = async (req, res, next) => {
  try {
    let results = await service.getAllContacts({});
    res.status(200).json(results);
  } catch (e) {
    console.error(e.message);
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await service.getContactById(contactId);
    if (!contact) return res.status(404).json({ message: "Not found" });
    if (contact) return res.status(200).json(contact);
  } catch (e) {
    console.error(e.message);
    next(e);
  }
};

const createContact = async (req, res, next) => {
  try {
    const name = req.body.name;
    if (!name)
      return res.status(400).json({ message: "missing required name field" });
    const result = await service.createContact(req.body);
    if (!result)
      return res.status(404).json({ message: "Something goes wrong" });
    if (result) return res.status(201).json(result);
  } catch (e) {
    console.error(e.message);
    next(e);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    if (!name && !email && !phone)
      return res.status(400).json({ message: "missing fields" });
    const result = await service.updateContact(contactId, req.body);
    if (!result) return res.status(404).json({ message: "Not found" });
    if (result) return res.status(200).json(result);
  } catch (e) {
    console.error(e.message);
    next(e);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    if (favorite === undefined || favorite === null)
      return res.status(400).json({ message: "missing field favorite" });
    const result = await service.updateStatusContact(contactId, req.body);
    if (!result) return res.status(404).json({ message: "Not found" });
    if (result) return res.status(200).json(result);
  } catch (e) {
    onsole.error(e.message);
    next(e);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await service.removeContact(contactId);
    if (!contact) return res.status(404).json({ message: "Not found" });
    if (contact) return res.status(200).json({ message: "Contact deleted" });
  } catch (e) {
    console.error(e.message);
    next(e);
  }
};

module.exports = {
  get,
  getById,
  createContact,
  updateContact,
  updateFavorite,
  removeContact,
};
