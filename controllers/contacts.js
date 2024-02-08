const service = require("../service");
const { contactValidator } = require("./../utils/validators/validator");

const getAll = async (req, res, next) => {
  try {
    const contacts = await service.getAllContacts();
    res.status(200).json(contacts);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await service.getContactById(contactId);
    if (!contact) return;
    res.status(404).json({ message: "Not found" });

    if (contact) return;
    res.status(200).json(contact);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const addContact = async (req, res, next) => {
  let { name, email, phone, favorite } = req.body;
  if (!favorite) {
    favorite = false;
  }
  try {
    const result = await service.createContact({
      name,
      email,
      phone,
      favorite,
    });
    res.status(201).json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactValidator(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    if (!name && !email && !phone)
      return res.status(400).json({ message: "missing fields" });
    const result = await service.update(contactId, req.body);
    if (!result) return res.status(404).json({ message: "Not found" });
    if (result)
      return res.json({
        status: "success",
        code: 200,
        data: { result },
      });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const setFavorite = async (req, res, next) => {
  try {
    const { e } = contactValidator(req.body);
    const { contactId } = req.params;
    const { favorite } = req.body;
    if (favorite === undefined || favorite === null)
      return res.status(400).json({ message: "Missing field favorite" });
    const result = await service.updateStatusContact(contactId, req.body);
    if (!result) return res.status(404).json({ message: "Not found" });
    if (result)
      return res.json({
        status: "success",
        code: 200,
        data: { result },
      });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactToRemove = await service.deleteContact(contactId);
    if (!contactToRemove)
      return res.status(404).json({ message: "Not found contact" });
    if (contactToRemove) return;
    res.status(200).json({ message: "Contact deleted" });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  addContact,
  updateContact,
  removeContact,
  setFavorite,
};
