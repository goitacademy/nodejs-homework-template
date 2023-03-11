const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite = "" } = req.query;
  const skip = (page - 1) * limit;
  if (favorite) {
    const result = await Contact.find({ owner, favorite }, "", { skip, limit });
    res.json(result);
  }
  const result = await Contact.find({ owner }, "", { skip, limit });
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const result = await Contact.findById({ _id: contactId, owner: _id });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  console.log(_id);
  const result = await Contact.findOneAndDelete({ _id: contactId, owner: _id });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json("Contact deleted");
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: _id },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const key = Object.keys(req.body);
  const { _id } = req.user;
  if (!key.length) {
    throw HttpError(400, "missing field favorite");
  }
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: _id },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
