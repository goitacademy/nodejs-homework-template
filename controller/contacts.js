const contacts = require("../service/contacts");

const get = async (req, res, next) => {
  try {
    const results = await contacts.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: results,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const result = await contacts.getContactById(req.params.contactId);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: result,
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `There is no contact with such id: ${req.params.contactId}`,
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const contact = await contacts.removeContact(req.params.contactId);
    if (contact) {
      res.json({
        status: "success",
        code: 200,
        data: contact,
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `There is no contact with such id: ${req.params.contactId}`,
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const add = async (req, res, next) => {
  try {
    const contact = await contacts.addContact(req.body);
    if (contact) {
      res.json({
        status: "success",
        code: 201,
        data: contact,
      });
    } else {
      res.status(400).json({
        status: "error",
        code: 400,
        message: `Not data`,
        data: "Not data",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res
      .status(400)
      .json({ status: "error", code: 400, message: "missing fields" });
    return;
  }
  try {
    const contact = await contacts.updateContact(
      req.params.contactId,
      req.body
    );
    if (contact) {
      res.json({
        status: "success",
        code: 200,
        data: contact,
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not data`,
        data: "Not data",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  get,
  add,
  remove,
  update,
  getById,
};
