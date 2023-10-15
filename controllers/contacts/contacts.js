const { Contact } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");

const getAll = async (req, res) => {
  const data = await Contact.find();
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ code: 200, data });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ code: 200, data: contact });
};

const add = async (req, res) => {
  const data = await Contact.create(req.body);
  res.status(201).json({ code: 201, data });
};

const remove = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndRemove(contactId);
  if (!deletedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ code: 200, message: "Contact removed" });
};

const update = async (req, res) => {
  const { contactId } = req.params;
  const newContact = await Contact.findOneAndUpdate(contactId, req.body);
  if (!newContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ code: 200, data: newContact });
};

const updateStatusContact = async (req, res) => {
  if (req.body.favorite === undefined) {
    throw HttpError(400, "missing field favorite");
  }
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite: req.body.favorite },
    { new: true }
  );
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ code: 200, data: updatedContact });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  remove: ctrlWrapper(remove),
  update: ctrlWrapper(update),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
