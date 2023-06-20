const service = require("../service");

const getAll = async (req, res) => {
  const contacts = await service.getAllContacts();
  console.log("contacts: ", contacts);
  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await service.getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
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
    console.warn(e);
    next(e);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const fields = req.body;
    const contact = await service.updateContact(contactId, fields);

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const setFavorite = async (req, res, next) => {
  try {
    const { favorite } = req.body;
    const { contactId } = req.params;
    const contact = await service.updateStatusContact(contactId, favorite);

    if (!contact) {
      return res.status(404).json({ message: "Missing field favorite" });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactToRemove = await service.deleteContact(contactId);
    if (!contactToRemove) {
      return res.status(404).json({ message: "Not found contact" });
    } else {
      res.status(200).json({ message: "Contact deleted" });
    }
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
    next(error);
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
