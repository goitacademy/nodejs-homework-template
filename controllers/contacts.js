const service = require("../service");
const { contactValidator } = require("./../utils/validators/validator");

const getAll = async (req, res) => {
  const contacts = await service.getAllContacts();
  console.log("contacts: ", contacts);
  res.status(200).json(contacts);
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await service.getContactById(contactId);
    if (!contact) return;
    res.status(404).json({ message: "Not found" });

    if (contact) return;
    res.status(200).json(contact);
  } catch (e) {
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
    next(e);
  }
};

const updateContact = async (req, res, next) => {
  try {
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
    next(e);
  }
};

const setFavorite = async (req, res, next) => {
  try {
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
