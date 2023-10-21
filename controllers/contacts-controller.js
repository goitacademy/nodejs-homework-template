const { Contact } = require("../models/Contact.js");

const HttpError = require("./../helpers/HttpError.js");

const ctrlWrapper = require("../decorators/ctrlWrapper.js");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const query = { owner };

  if (favorite !== undefined) {
    query.favorite = favorite === "true";
  }

  const result = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");
  res.json(result);
};

const getById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOne({ _id: contactId, owner });
  if (!result) {
    res.status(404);
    throw HttpError(404, `Not found with id: ${contactId}`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ _id: contactId, owner }, req.body);
  if (!result) {
    throw HttpError(404, `The contact with ${contactId} is not found.`);
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body
  );
  if (!req.body) {
    res.json({
      message: "missing field favorite",
    });
    throw HttpError(400);
  }
  if (!result) {
    throw HttpError(404, `The contact with id ${contactId} is not found.`);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id: contactId, owner });
  if (!result) {
    res.status(404);
    throw HttpError(404, `The contact with id ${contactId} is not found.`);
  }
  res.json({
    message: "Delete is successful",
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  deleteById: ctrlWrapper(deleteById),
};
