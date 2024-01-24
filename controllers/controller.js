const service = require("../service/index");
const {
  validateAddContact,
  validateUpdateContact,
  validateUpdateFavorite,
} = require("../tools/validator");

const get = async (req, res, next) => {
  try {
    const contactsList = await service.getAllContacts();
    console.log(contactsList);
    res.json({ status: 200, body: contactsList });
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
      return res.json({ status: 200, data: getContact });
    } else {
      return res.json({ status: 404, msg: `Not found contact id: ${contactId}` });
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
      return res.json({ status: 400, msg: "Missing fields" });
    }
    const newContact = await service.createContact({
      name,
      email,
      phone,
      favorite,
    });
    res.json({ status: 201, msg: "Add new contact", data: newContact });
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
      res.json({
        status: 200,
        msg: "Contact deleted",
        data: contactToRemove,
      });
    } else {
      res.json({ status: 404, msg: `Not found contact id: ${contactId}` });
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
      return res.json({ status: 400, msg: "Missing fields" });
    }
    const renameContact = await service.updateContact(contactId, body);
    if (renameContact) {
      res.json({ status: 200, msg: "Contact update", data: renameContact });
    } else {
      res.json({ status: 404, msg: `Not found contact id: ${contactId}` });
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
      return res.json({ status: 400, msg: "Missing field favorite" });
    }
    const update = await service.updateContact(contactId, { favorite });
    if (update) {
      res.json({ status: 200, msg: "Update favorite", data: update });
    } else {
      res.json({ status: 404, msg: `Not found contact id: ${contactId}` });
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
