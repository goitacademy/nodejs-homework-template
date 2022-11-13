const Contacts = require("../services");
// const Contacts = require("../services/schemas/schema");
const getAllContact = async (_req, res, next) => {
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

    res.json({
      status: "success",
      code: 200,
      message: "Contact found",
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    res.status(201).json({
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
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body
    );

    res.json({
      status: "success",
      code: 200,
      message: "Contact updated",
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);

    res.json({
      status: "success",
      code: 200,
      message: "Contact deleted",
      data: {
        contact,
      },
    });
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
