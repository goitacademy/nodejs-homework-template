const { Contact } = require("../Service/schemas/contacts");

const HttpError = require("../Helpers/HttpError");
const ctrlWrapper = require("../Helpers/CtrlWrapper");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;

  const data = await Contact.find({ owner },  "-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.status(200).json(data);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findById(id);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json(data);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const data = await Contact.create({ ...req.body, owner });
  res.status(201).json(data);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findByIdAndRemove(id);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findOneAndUpdate({ _id: id }, req.body, {new: true });
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(data);
};
const updateStatus = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(data);
};



// контроллер
module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatus: ctrlWrapper(updateStatus),
};
