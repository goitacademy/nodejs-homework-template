const service = require("../service/contacts.js");

const getAll = async (req, res, next) => {
  try {
    const results = await service.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await service.getContact(contactId);
    if (!contact) return res.status(404).json({ message: "Not found" });
    if (contact) return res.status(200).json(contact);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
};

const addContact = async (req, res, next) => {
  try {
    const name = req.body.name;
    if (!name)
      return res.status(400).json({ message: "missing required name field" });
    const result = await service.createContact(req.body);
    if (!result)
      return res.status(404).json({ message: "Something goes wrong" });
    if (result)
      return res.json({
        status: "success",
        code: 201,
        data: { result },
      });
  } catch (err) {
    console.error(err.message);
    next(err);
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
  } catch (err) {
    console.error(err.message);
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    if (favorite === undefined || favorite === null)
      return res.status(400).json({ message: "missing field favorite" });
    const result = await service.updateStatusContact(contactId, req.body);
    if (!result) return res.status(404).json({ message: "Not found" });
    if (result)
      return res.json({
        status: "success",
        code: 200,
        data: { result },
      });
  } catch (err) {
    console.error(err.message);
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await service.removeContact(contactId);
    if (!contact) return res.status(404).json({ message: "Not found" });
    if (contact) return res.status(200).json({ message: "Contact deleted" });
  } catch (err) {
    console.error(err.message);
    next(err);
  }
};

module.exports = {
  getAll,
  getContactById,
  addContact,
  updateContact,
  updateStatus,
  remove,
};
