const { serviceContact } = require("../services/services");
const { ControllerWrapper } = require("../utils/ControllerWrapper");
const { HttpError } = require("../middlewares/httpError");

const getAllContactsController = async (_, res) => {
  const data = await serviceContact.listContacts();
  res.json(data);
};

const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const dataContacts = await serviceContact.getById(id);

  if (!dataContacts) throw HttpError(404);

  res.json(dataContacts);
};

const createContactController = async (req, res) => {
  const dataContacts = await serviceContact.addContact(req.body);

  if (!dataContacts) throw HttpError(400, `Missing required ${req.body} field`);

  res.status(201).json(dataContacts);
};

const updateContactController = async (req, res) => {
  const { id } = req.params;
  const dataContacts = await serviceContact.updateContact(id, req.body);

  if (!dataContacts) throw HttpError(404);

  res.status(200).json(dataContacts);
};

const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const dataContacts = await serviceContact.removeContact(id);

  if (!dataContacts) throw HttpError(404);

  res.status(200).json({ message: "Contact deleted" });
};

const updateContactStatus = async (req, res) => {
  const { id } = req.params;
  const dataContacts = await serviceContact.updateStatusContact(id, req.body);

  if (!dataContacts) throw HttpError(404);

  res.status(200).json(dataContacts);
};

const crtlContacts = {
  getAllContactsController: ControllerWrapper(getAllContactsController),
  getContactByIdController: ControllerWrapper(getContactByIdController),
  createContactController: ControllerWrapper(createContactController),
  updateContactController: ControllerWrapper(updateContactController),
  deleteContactController: ControllerWrapper(deleteContactController),
  updateContactStatus: ControllerWrapper(updateContactStatus),
};

module.exports = {
  crtlContacts,
};
