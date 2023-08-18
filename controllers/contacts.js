const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers/index");

const getAll = async (_, res) => {
  const data = await Contact.find();
  res.json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findById(id);
  if (!data) {
    throw HttpError(404, "Not Found");
  }
  res.json(data);
};

const addContact = async (req, res) => {
  const data = await Contact.create(req.body);
  res.status(201).json(data);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findByIdAndRemove(id);
  if (!data) {
    throw HttpError(404, "Not Found");
  }
  res.json({ message: "contact deleted" });
};

const editContact = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!data) {
    throw HttpError(404, "Not Found");
  }
  res.json(data);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!data) {
    throw HttpError(404, "Not Found");
  }
  res.json(data);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  editContact: ctrlWrapper(editContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};

// mongodb + srv://IsaienkoViktor:<7sGiWdp8CRx1IrRV>@cluster0.fq7vncz.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://IsaienkoViktor:<7sGiWdp8CRx1IrRV>@cluster0.fq7vncz.mongodb.net/
