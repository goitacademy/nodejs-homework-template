const { HttpError } = require("../helpers");

const ctrlWrraper = require("../helpers/ctrlWrraper");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

const updateById = async (req, res) => {
  const bodyIsEmpty = !Object.keys(req.body).length;

  if (bodyIsEmpty) {
    throw HttpError(400, "missing fields");
  }

  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrraper(getAll),
  getById: ctrlWrraper(getById),
  addContact: ctrlWrraper(addContact),
  deleteById: ctrlWrraper(deleteById),
  updateById: ctrlWrraper(updateById),
};
