const Contacts = require("../model/index");

const getAll = async (_req, res, next) => {
  try {
    const allContacts = await Contacts.listContacts();
    return res.status(200).json({
      status: "success",
      code: 200,
      data: { allContacts },
    });
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: { message: "Data not found" },
      });
    }
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res.status(201).json({
        status: "success",
        code: 201,
        data: {
          contact,
          message: "contact deleted",
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: { message: "Data not found" },
      });
    }
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    if (req.body) {
      console.log("есть такое", req.body);
      const contact = await Contacts.updateContact(
        req.params.contactId,
        req.body
      );

      return res.status(200).json({
        status: "success",
        code: 200,
        data: { contact },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: { message: "Data not found" },
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  update,
  remove,
  create,
};
