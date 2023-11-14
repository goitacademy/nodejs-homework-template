const { Contact } = require("../schemas/contacts");

const { ctrlWrapper, HTTPError } = require("../helpers");
const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite = null } = req.query;

  const searchQuery =
    favorite === null ? { owner } : { owner, favorite: req.query.favorite };
  const skip = (page - 1) * limit;

  const contacts = await Contact.find(searchQuery, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "_id");
  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  const { _id: owner } = req.user;
  if (owner.toString() !== contact.owner.toString()) {
    throw HTTPError(401);
  }
  if (!contact) {
    throw HTTPError(404);
  }
  res.status(200).json(contact);
};
const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const remove = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  const { _id: owner } = req.user;

  if (owner.toString() !== contact.owner.toString()) {
    throw HTTPError(401);
  }

  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw HTTPError(404);
  }
  res.status(200).json({ message: "contact deleted" });
};

const update = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  const { _id: owner } = req.user;

  if (owner.toString() !== contact.owner.toString()) {
    throw HTTPError(401);
  }
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { ...req.body },
    { new: true }
  );
  if (!result) {
    throw HTTPError(404);
  }
  res.status(200).json(result);
};

const updateStatus = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  const { _id: owner } = req.user;

  if (owner.toString() !== contact.owner.toString()) {
    throw HTTPError(401);
  }
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { ...req.body },
    { new: true }
  );
  if (!result) {
    throw HTTPError(404);
  }
  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  update: ctrlWrapper(update),
  remove: ctrlWrapper(remove),
  add: ctrlWrapper(add),
  updateStatus: ctrlWrapper(updateStatus),
};
