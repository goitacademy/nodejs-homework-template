const contacts = require("../models/contacts");

const { HttpError, CtrlWrapper } = require("../helpers");


const getAll = async (req, res) => {
  const contact = await contacts.listContacts();
  res.json(contact);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
    // const error = new Error("Not found");
    // error.status = 404;
    // throw error;

    // return res.status(404).json({
    //   message: "Not found",
    // });
  }
  res.json(contact);
};

const postCont = async (req, res) => {
  const contact = await contacts.addContact(req.body);
  res.status(201).json(contact);
};

const deleteCont = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contacts.removeContact(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Contact deleted",
  });
};

const putCont = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contacts.updateContact(contactId, req.body);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

module.exports = {
  getAll: CtrlWrapper(getAll),
  getById: CtrlWrapper(getById),
  postCont: CtrlWrapper(postCont),
  deleteCont: CtrlWrapper(deleteCont),
  putCont: CtrlWrapper(putCont),
};
