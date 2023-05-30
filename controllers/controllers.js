// const contactsService = require("../models/contacts");
const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

async function getListController(req, res, next) {
  const result = await Contact.find();
  res.json(result);
}

async function getContactController(req, res, next) {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
}

async function postContactController(req, res, next) {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
}

async function deleteContactController(req, res, next) {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
}

async function putContactController(req, res, next) {
  if (!req.body) {
    throw HttpError(400, "missing fields");
  }

  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
}
const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

module.exports = {
  getListController: ctrlWrapper(getListController),
  getContactController: ctrlWrapper(getContactController),
  postContactController: ctrlWrapper(postContactController),
  deleteContactController: ctrlWrapper(deleteContactController),
  putContactController: ctrlWrapper(putContactController),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
