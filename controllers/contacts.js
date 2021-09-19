const contactsOperation = require("../model");
const contactsSchema = require("../schemas");

const listContacts = async (req, res, next) => {
  try {
    const contacts = await contactsOperation.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperation.getContactById(contactId);
    if (!contact) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    return res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }
    const contact = await contactsOperation.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const removeContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperation.removeContactById(contactId);

    if (!contact) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    return res.json({
      status: "success",
      code: 200,
      message: "Success remove",
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      const err = new Error(error.message);
      err.status = 400;
      throw err;
    }
    const { contactId } = req.params;
    const contact = await contactsOperation.updateContactById(
      contactId,
      req.body
    );
    if (!contact) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    return res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContactById,
  updateContactById,
};
