const { HttpError, ctrlWrapper } = require("../helpers");
const { Contact, schemas } = require("../models/contact");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  console.log(owner);
  // const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
  //   skip,
  //   limit,
  // }).populate("owner", " email");

  const result = await Contact.find(
    { owner },
    "-createdAt -updatedAt"
  ).populate("owner", " email");

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const getById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOne({ contactId, owner });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { error } = schemas.addSchemaforPost.validate(req.body);
  const { favorite } = req.body;
  if (error) {
    throw HttpError(400, "missing required name field");
  }

  if (favorite === undefined) {
    req.body = {
      ...req.body,
      favorite: false,
    };
    console.log("favorite false");
  }
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  result = await Contact.findOneAndDelete({ contactId, owner });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const updateById = async (req, res, next) => {
  const { _id: owner } = req.user;

  const { contactId } = req.params;
  const { error } = schemas.addSchemaforPut.validate(req.body);
  const length = Object.keys(req.body).length;

  if (length === 0) {
    throw HttpError(400, "No body");
  }

  if (error) {
    throw HttpError(400, "missing fields");
  }

  const result = await Contact.findOneAndUpdate(
    { contactId, owner },
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

const updateStatusContact = async (req, res, next) => {
  const { _id: owner } = req.user;

  const { contactId } = req.params;
  const length = Object.keys(req.body).length;

  if (length === 0) {
    throw HttpError(400, "missing field favorite");
  }

  const result = await Contact.findOneAndUpdate(
    { contactId, owner },
    req.body,
    {
      new: true,
    }
  );
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
