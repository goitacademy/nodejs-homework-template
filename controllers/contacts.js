const Contact = require("../models/contact");

const { HttpError, ctrlWrap } = require("../helpers");



const getAll = async (req, res) => {
  const result = await Contact.find({}, '-createdAt -updatedAt').exec();
  res.send(result);
};

const getById = async (req, res) => {
  const result = await Contact.findById(req.params.contactId, '-createdAt -updatedAt').exec();
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.send(result);
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);

  const { name } = req.params;
  const contact = await Contact.findOne({ name }).exec();
  if (contact) {
    throw HttpError(409, "Contact already exists");
  }
  
  res.status(201).send(result);
};

const remove = async (req, res) => {
  const result = await Contact.findByIdAndDelete(req.params.contactId).exec();
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.send({ message: "contact deleted" });
};

const updateByID = async (req, res) => {
  const result = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {new: true}).exec();
  console.log(result);
    if (!result) {
    throw HttpError(404, "Not found");
  }
  res.send(result);
};

const updateStatusContact = async (req, res) => {
  const result = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {new: true}).exec();
  console.log(result);
    if (!result) {
    throw HttpError(404, "Not found");
  }
  res.send(result);
};

module.exports = {
  getAll: ctrlWrap(getAll),
  getById: ctrlWrap(getById),
  add: ctrlWrap(add),
  remove: ctrlWrap(remove),
  updateByID: ctrlWrap(updateByID),
  updateStatusContact: ctrlWrap(updateStatusContact),
};
