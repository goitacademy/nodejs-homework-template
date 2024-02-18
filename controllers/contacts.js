const service = require("../service/contacts");
const { contactValidator } = require("./../utils/validator");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  try {
    const result = await service.getAllContacts(owner);
    res.json({
      status: "success",
      code: 200,
      message: "Contacts successfully found",
      data: {
        contacts: result,
      },
    });
  } catch (e) {
    console.log(e.message);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  try {
    const result = await service.getContactById(contactId, userId);
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
  } catch (e) {
    console.log(e.message);
    next(e);
  }
};

const addContact = async (req, res, next) => {
  const { error, value } = contactValidator(req.body);
  const { name, email, phone } = value;
  const { _id: owner } = req.user;
  if (error) {
    res.status(400).json({
      status: "failure",
      code: 400,
      error: error.details,
    });
  } else {
    try {
      const result = await service.createContact({ name, email, phone }, owner);
      res.status(201).json({
        status: "success",
        code: 201,
        message: "Contact successfully created!",
        data: { contact: result },
      });
    } catch (e) {
      console.log(e.message);
      next(e);
    }
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { error, value } = contactValidator(req.body);
  const { name, email, phone } = value;
  const userId = req.user._id;
  if (error) {
    res.status(400).json({
      status: "failure",
      code: 400,
      error: error.details,
    });
  } else {
    try {
      const result = await service.updateContact(
        contactId,
        {
          name,
          email,
          phone,
        },
        userId
      );
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
          message: "Not found",
        });
      }
    } catch (e) {
      console.log(e.message);
      next(e);
    }
  }
};

const setFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const userId = req.user._id;
  if (favorite === undefined || favorite === null) {
    return re.satatus(400).json({
      status: "error",
      code: 400,
      message: "Missing field favourite",
    });
  }
  try {
    const result = await service.updateStatusContact(
      contactId,
      req.body,
      userId
    );
    if (result) {
      res.json({
        status: "success",
        code: 200,
        message: "Contact status successfully updated!",
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
  } catch (e) {
    console.log(e.message);
    next(e);
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  try {
    const result = await service.removeContact(contactId, userId);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        message: "Contact deleted",
      });
    } else {
      res.status(404).json({
        status: "failure",
        code: 404,
        message: `Not found task with id: ${contactId}`,
        data: "Not found",
      });
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  addContact,
  updateContact,
  setFavorite,
  removeContact,
};
