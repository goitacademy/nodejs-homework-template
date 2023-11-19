const { Contact } = require("../models/contact");
const { controllerWrapper, HttpError } = require("../helpers");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner })
    .skip(skip)
    .limit(parseInt(limit))
    .populate("owner", "name email");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const result = await Contact.findById(contactId);
  if (!result || result.owner.toString() !== userId) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result || result.owner.toString() !== userId) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result || result.owner.toString() !== userId) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const result = await Contact.findOneAndDelete(contactId);
  if (!result || result.owner.toString() !== userId) {
    throw HttpError(404, "Not Found");
  }
  res.json({
    message: "contact deleted",
  });
};

module.exports = {
  listContacts: controllerWrapper(listContacts),
  getContactById: controllerWrapper(getContactById),
  removeContact: controllerWrapper(removeContact),
  addContact: controllerWrapper(addContact),
  updateContactById: controllerWrapper(updateContactById),
  updateFavorite: controllerWrapper(updateFavorite),
};
