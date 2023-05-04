const Contact = require("../models/contact");
const { HTTPError } = require("../helpers");
const { cntrlWrapper } = require("../helpers");
const getAll = async (requirement, response) => {
  const allContacts = await Contact.find();
  response.status(200).json(allContacts);
};

const getById = async (requirement, response) => {
  const { contactId } = requirement.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw HTTPError(404, "Not Found contact");
  }
  response.status(200).json(contact);
};

const addContact = async (requirement, response) => {
  const body = requirement.body;
  console.log(body);
  const contact = await Contact.create(body);
  response.status(201).json(contact);
};

const deleteContact = async (requirement, response) => {
  const { contactId } = requirement.params;
  const contact = await Contact.findByIdAndRemove(contactId);
  if (!contact) {
    throw HTTPError(404, "Not Found contact");
  }
  response.status(200).json({ message: "contact deleted in base" });
};

const updateContact = async (requirement, response) => {
  const body = requirement.body;
  const { contactId } = requirement.params;
  const contact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!contact) {
    throw HTTPError(404, "Not Found contact");
  }
  response.status(201).json(contact);
};

const updateStatusContact = async (requirement, response) => {
  const body = requirement.body;
  const { contactId } = requirement.params;
  const contact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!contact) {
    throw HTTPError(404, "Not Found");
  }
  response.status(201).json(contact);
};

module.exports = {
  getAll: cntrlWrapper(getAll),
  getById: cntrlWrapper(getById),
  addContact: cntrlWrapper(addContact),
  deleteContact: cntrlWrapper(deleteContact),
  updateContact: cntrlWrapper(updateContact),
  updateStatusContact: cntrlWrapper(updateStatusContact),
};
