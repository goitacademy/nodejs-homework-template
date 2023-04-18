const { ctrlWrapper } = require("../utils");

const { Contact } = require("../models");

const { HttpError } = require("../helpers");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite = false } = req.query;
  const skip = (page - 1) * limit;
  const contacts = favorite
    ? await Contact.find({ owner, favorite: true }, "", {
        skip,
        limit,
      }).populate("owner", "name email")
    : await Contact.find({ owner }, "", { skip, limit }).populate(
        "owner",
        "name email"
      );
  if (!contacts) {
    throw HttpError(404, `Request failed`);
  }
  res.json(contacts);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  console.log(owner);
  const result = await Contact.create({ ...req.body, owner });
  if (!result) {
    throw HttpError(404, `Creation failed`);
  }
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json({ message: `Contact ${id} delete success` });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: "missing fields" });
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
