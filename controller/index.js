const Contacts = require("../services");
// const Contacts = require("../services/schemas/schema");
const getAllContact = async (req, res, next) => {
  try {
    const contacts = await Contacts.getAll();
    res.json({
      status: "success",
      code: 200,
      message: "Contacts found",
      data: {
        contacts,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        message: "Contact found",
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    return res.status(201).json({
      status: "success",
      code: 201,
      message: "Contact created",
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
};

const updateContact = async (req, res, next) => {
  try {
    await Contacts.updateContact(req.params.contactId, req.body);
  } catch (e) {
    next(e);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        message: "Contact deleted",
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllContact,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
