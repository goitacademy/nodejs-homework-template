const contactsService = require("../models/index");
const { HttpError } = require("../helpers/index.js");
const { ctrlWrapper } = require("../utils/");

const getListContacts = async (req, res, next) => {
  res.json(await contactsService.listContacts());
};

const getContactById = async (req, res, next) => {
    // console.log(req.query)
    // console.log(req.params)
  const contact = await contactsService.getContactById(req.params.contactId);
//   console.log('GET by ID', contact)
  if (!contact) throw HttpError(404);

  res.status(200).json(contact);
};

const postContact = async (req, res, next) => {
  const contact = await contactsService.addContact(req.body);

  res.status(201).json(contact);
};

const deleteContactByid = async (req, res, next) => {
  const contact = await contactsService.removeContact(req.params.contactId);
//   console.log('DELETE by id', contact)
  if (!contact) throw HttpError(404);

  res.json({
    message: "Contact deleted",
  });
};

const putContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const { error } = contactUpdateSchema.validate(req.body);
  const { name, email, phone } = req.body;

  if (error) {
    throw HttpError(400, error.message);
  }

  const contact = await contactsService.updateContact(contactId, {
    name,
    email,
    phone,
  });

  if (!contact) {
    throw HttpError(404);
  }

  res.json(contact);
};

module.exports = {
  getListContacts: ctrlWrapper(getListContacts),
  getContactById: ctrlWrapper(getContactById),
  postContact: ctrlWrapper(postContact),
  deleteContactByid: ctrlWrapper(deleteContactByid),
  putContactById: ctrlWrapper(putContactById),
};
