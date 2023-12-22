const { httpError, ctrlWrapper } = require("../helpers");

const { Contact } = require("../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const query = { owner, ...(favorite ? { favorite: true } : {}) };
  const allContacts = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");
  res.status(200).json({
    page,
    limit,
    contacts : allContacts
  });
};

const getById = async (req, res) => {
  const { id } = req.params;
  // const oneContact = await Contact.findOne({_id: id});
  const oneContact = await Contact.findById(id);
  if (!oneContact) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(oneContact);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const deletedContact = await Contact.findByIdAndDelete(id);
  if (!deletedContact) {
    throw httpError(404, "Not found");
  }
  res.status(200).json({ massage: "contact deleted" });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const editedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!editedContact) {
    throw httpError(404, "Not found");
  }
  res.status(201).json(editedContact);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const editedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!editedContact) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(editedContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
