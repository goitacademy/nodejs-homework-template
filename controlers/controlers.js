const server = require("../models/contacts");
const schema = require("../schemas/schemas");

const getList = async (req, res, next) => {
  try {
    const list = await server.listContacts();
    res.json(list);
  } catch (error) {
    next(error);
  }
};
const getListById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await server.getContactById(contactId);
    if (!contact) {
      return res
        .status(400)
        .json({ message: `failure, no contact with id= ${contactId} found` });
    }
    res.json({ contact, message: "success" });
  } catch (error) {
    next(error);
  }
};

const postContact = async (req, res, next) => {
  try {
    const validationResult = schema.schemaPost.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: "missing required name field" });
    }
    const { name, email, phone } = req.body;
    await server.addContact(name, email, phone);
    res.json({ status: "success" });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await server.getContactById(contactId);
    await server.removeContact(contactId);
    if (!contact) {
      return res
        .status(400)
        .json({ message: `failure, no contact with id= ${contactId} found` });
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const putById = async (req, res, next) => {
  try {
    const validationResult = schema.schemaPut.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error });
    }
    const { contactId } = req.params;
    if (Object.keys(req.body).length === 0) {
      console.log("bye");
      return res.status(400).json({ message: "missing fields" });
    }
    const contact = await server.updateContact(contactId, req.body);
    console.log(req.body);

    res.json({ contact, message: "success" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getList,
  getListById,
  postContact,
  deleteById,
  putById,
};
