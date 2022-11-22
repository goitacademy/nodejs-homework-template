const methods = require("../models/contacts");
const { NotFound } = require("http-errors");

const getContactList = async (req, res, next) => {
  try {
    const contacts = await methods.listContacts();

    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getContactsById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await methods.getContactById(contactId);
    if (!result) {
      throw new NotFound("Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

const addContactById = async (req, res, next) => {
  try {
    const result = await methods.addContact(req.body);
    return res.status(201).json({
      status: "success",
      code: 201,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

const deleteContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await methods.removeContact(contactId);
    if (!result) {
      throw new NotFound("Not found");
    }
    res.json({
      status: "success",
      code: 200,
      message: `contact with id - ${req.params.contactId} deleted`,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await methods.updateContact(contactId, req.body);
    if (!result) {
      throw new NotFound();
    }
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getContactList,
  getContactsById,
  addContactById,
  deleteContactById,
  updateContactById,
};
