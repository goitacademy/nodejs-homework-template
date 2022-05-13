const service = require("../service");

const get = async (req, res, next) => {
  try {
    const contacts = await service.listContacts();
    res.json(contacts);
  } catch (e) {
    next(e);
  }
};

const getOne = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await service.getContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (e) {
    next(e);
  }
};

const post = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  try {
    const result = await service.addContact({ name, email, phone, favorite });
    res.status(201).json({ message: "Contact created!", contact: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get,
  getOne,
  post,
};
