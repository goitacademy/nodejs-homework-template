const path = require("path");
const { httpError, ctrlWrapper } = require("../helpers");
const { Contact } = require(path.resolve(__dirname, "../models/contact"));

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find(
    { owner, favorite: favorite ?? [true, false] },
    // "-createdAt -updatedAt",
    null,
    {
      skip,
      limit: parseInt(limit),
    }
  ).populate("owner", "_id email");

  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const contactId = req.params.contactId;
  const result = await Contact.findById({ _id: contactId });
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const contactId = req.params.contactId;
  const removedById = await Contact.findByIdAndDelete(contactId);

  if (!removedById) {
    throw httpError(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
};

const updateContactById = async (req, res) => {
  const contactId = req.params.contactId;
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId },
    req.body,
    { new: true }
  );

  if (!updatedContact) {
    throw httpError(404, "Not found");
  }

  res.json(updatedContact);
};

const updateFavorite = async (req, res) => {
  const contactId = req.params.contactId;
  const result = await Contact.findOneAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });

  if (!result) {
    throw httpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateContactById: ctrlWrapper(updateContactById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
