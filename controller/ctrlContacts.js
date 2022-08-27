const service = require("../service");
const { schema } = require("../helpers/joiSchema.js");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const fav = req.query.favorite;
  if (fav) {
    try {
      const results = await service.getFavContacts(fav, _id);
      res.status(200).json({
        status: "success",
        code: 200,
        message: "OK",
        data: {
          contacts: results,
        },
      });
    } catch (e) {
      console.error(e);
      next(e);
    }
  } else {
    try {
      const results = await service.getAllContacts(_id);
      res.status(200).json({
        status: "success",
        code: 200,
        message: "OK",
        data: {
          contacts: results,
        },
      });
    } catch (e) {
      console.error(e);
      next(e);
    }
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await service.getContactById(id);
    if (result) {
      res.status(200).json({
        status: "success",
        code: 200,
        message: "OK",
        data: {
          contacts: result,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { _id } = req.user;
  const { error } = schema.validate({ name, email, phone });
  if (!error) {
    try {
      const result = await service.createContact({ name, email, phone, _id });
      res.status(201).json({
        status: "success",
        code: 201,
        message: "Created",
        data: {
          contacts: result,
        },
      });
    } catch (e) {
      console.error(e);
      next(e);
    }
  } else {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.details[0].message,
      data: "Bad Request",
    });
  }
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const result = await service.updateContact({ id, name, email, phone });
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        contacts: result,
      },
      message: "Contact updated",
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body; // favourite can be replace with fields to patch many fields
  try {
    const result = await service.updateContact({ id, favorite });
    if (result) {
      res.status(200).json({
        status: "success",
        code: 200,
        message: "OK",
        data: {
          contacts: result,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `missing field favorite`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const removeContactById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await service.removeContact(id);
    if (result) {
      res.status(200).json({
        status: "success",
        code: 200,
        data: {
          contacts: result,
        },
        message: "Contact deleted",
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  addContact,
  removeContactById,
  updateContact,
  updateStatus,
};
