const { Contacts } = require("../../model");
const listContacts = async (_req, res, next) => {
  try {
    const contact = await Contacts.listContacts();
    return res.json({
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const contact = await Contacts.getById(req.params.contactId);
    if (contact) {
      return res.json({
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      throw new createError(404, "Not Found");
    }
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    return res.status(201).json({
      code: 201,
      message: "Contact created",
    });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res.json({
        code: 200,
        message: "contact deleted",
      });
    } else {
      throw new createError(404, "Not Found");
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        code: 400,
        message: "missing fields",
      });
    }
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res.json({
        code: 200,
        message: "Contact updated successfully",
        result: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        code: 404,
        message: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  listContacts,
  getById,
  addContact,
  updateContact,
  removeContact,
};
