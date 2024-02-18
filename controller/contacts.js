const service = require("../service/contactsService");
const { validateContact } = require("../validator/contactValidator");

const getContacts = async (req, res, next) => {
  try {
    const result = await service.getAllContacts(req.query);
    res.json({
      status: "success",
      code: 200,
      message: "Contacts successfully found",
      data: {
        contacts: result,
      },
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await service.getContactById(contactId);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        message: "Contact successfully found",
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found a contact with id: ${contactId}`,
      });
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const createContact = async (req, res, next) => {
  const { error, value } = validateContact(req.body);
  const { name, email, phone } = value;
  if (error) {
    res.status(400).json({
      status: "failure",
      code: 400,
      error: error.details,
    });
  } else {
    try {
      const result = await service.createContact({ name, email, phone });
      res.status(201).json({
        status: "success",
        code: 201,
        message: "Contact successfully created!",
        data: { contact: result },
      });
    } catch (err) {
      console.log(err.message);
      next(err);
    }
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { error, value } = validateContact(req.body);
  const { name, email, phone } = value;
  if (error) {
    res.status(400).json({
      status: "failure",
      code: 400,
      error: error.details,
    });
  } else {
    try {
      const result = await service.updateContact(contactId, {
        name,
        email,
        phone,
      });
      if (result) {
        res.json({
          status: "success",
          code: 200,
          message: "Contact successfully updated!",
          data: { contact: result },
        });
      } else {
        res.status(404).json({
          status: "failure",
          code: 404,
          message: "Not Found",
        });
      }
    } catch (err) {
      console.log(err.message);
      next(err);
    }
  }
};

const updateContactStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favourite } = req.body;
  if (favourite === undefined) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Missing field favourite",
    });
  }
  try {
    const result = await service.updateContact(contactId, { favourite });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        message: "Status of contact successfully updated!",
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task with id: ${contactId}`,
        data: "Not found",
      });
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await service.removeContact(contactId);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        message: "The contact has been removed",
      });
    } else {
      res.status(404).json({
        status: "failure",
        code: 404,
        error: `Cannot remove a task with id: ${contactId}`,
      });
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

module.exports = {
  getContacts,
  getById,
  createContact,
  updateContact,
  updateContactStatus,
  removeContact,
};
