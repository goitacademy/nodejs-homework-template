const { Contact } = require("../models/contact");
const { HTTPError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};
const getByID = async (req, res) => {
  const { contactId } = req.params;
  const contactByID = await Contact.findById(contactId);
  if (!contactByID) {
    throw HTTPError(404, "Not found");
  }
  res.json(contactByID);
};
const add = async (req, res) => {
  console.log(req);
  const result = await Contact.create(req.body);

  res.status(201).json(result);
};
const deleteByID = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HTTPError(404, "Not found");
  }
  return res.status(200).json({ message: "contact deleted" });
};

const update = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HTTPError(404, "Not found");
  }
  res.json(result);
};
const updateStatusContactavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!req.body.favorite) {
    throw HTTPError(400, "missing field favorite");
  }
  if (!result) {
    throw HTTPError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getByID: ctrlWrapper(getByID),
  add: ctrlWrapper(add),
  deleteByID: ctrlWrapper(deleteByID),
  update: ctrlWrapper(update),
  updateStatusContactavorite: ctrlWrapper(updateStatusContactavorite),
};
