const service = require("../service/index.js");
const {
  validateAddContact,
  validateUpdateContact,
  validateUpdateFavorite,
} = require("../service/validator");

const get = async (req, res, next) => {
  try {
    const contactsList = await service.getAllContacts();
    console.log(contactsList);
    res.status(200).json({ body: contactsList });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const getContact = await service.getContactById(contactId);
    console.log(getContact);
    if (getContact) {
      return res.status(200).json({ data: getContact });
    } else {
      return res.status(404).json({msg: `Not found contact id: ${contactId}` });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const createContact = async (req, res, next) => {
  const { name, email, phone, favorite = false } = req.body;
  const { error } = validateAddContact(req.body);

  try {
    if (error) {
      console.log(error);
      return res.status(400).json({msg: "Missing fields" });
    }
    const newContact = await service.createContact({
      name,
      email,
      phone,
      favorite,
    });
    res.status(201).json({ msg: "Add new contact", data: newContact });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contactToRemove = await service.removeContact(contactId);
    if (contactToRemove) {
      res.status(200).json({
        msg: "Contact deleted",
        data: contactToRemove,
      });
    } else {
      res.status(404).json({ msg: `Not found contact id: ${contactId}` });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  const { error } = validateUpdateContact(req.body);

  try {
    if (error) {
      console.log(error);
      return res.status(400).json({ msg: "Missing fields" });
    }
    const renameContact = await service.updateContact(contactId, body);
    if (renameContact) {
      res.status(200).json({ msg: "Contact update", data: renameContact });
    } else {
      res.status(404).json({ msg: `Not found contact id: ${contactId}` });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite = false } = req.body;
  const { error } = validateUpdateFavorite(req.body);

  try {
    if (error) {
      console.log(error);
      return res.status(400).json({ msg: "Missing field favorite" });
    }
    const update = await service.updateContact(contactId, { favorite });
    if (update) {
      res.status(200).json({ msg: "Update favorite", data: update });
    } else {
      res.status(404).json({ msg: `Not found contact id: ${contactId}` });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  get,
  getById,
  createContact,
  removeContact,
  updateContact,
  updateFavorite,
};