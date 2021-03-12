const ContactsAPI = require("../model/contactsAPI.js");

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const allContacts = await ContactsAPI.getAll(userId);
    return res.json({
      status: "success",
      code: 200,
      data: allContacts,
    });
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await ContactsAPI.getById(req.params.contactId, userId);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: contact,
      });
    } else {
      return res.json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (err) {
    next(err);
  }
};

const addContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const newContact = await ContactsAPI.add({ ...req.body, owner: userId });
    return res.json({
      status: "success",
      code: 201,
      data: newContact,
    });
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const deletedContact = await ContactsAPI.remove(
      req.params.contactId,
      userId
    );
    if (deletedContact) {
      return res.json({
        status: "success",
        code: 200,
        data: deletedContact,
      });
    } else {
      return res.json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updatedContact = await ContactsAPI.update(
      req.params.contactId,
      req.body,
      userId
    );
    if (updatedContact) {
      return res.json({
        status: "success",
        code: 200,
        data: updatedContact,
      });
    } else {
      return res.json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  addContact,
  deleteContact,
  updateContact,
};
