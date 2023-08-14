const { HttpError } = require("../helpers/HttpError");
const { ctrlWrapper } = require("../helpers/ctrlWrapper");

const { Contact } = require("../models/contact");

const getAll = async (req, res, next) => {
  const data = await Contact.find();
  res.json(data);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await Contact.findById({ _id: contactId });
  if (!data) {
    throw HttpError(404, "Not Found");
  }

  res.json(data);
};

const add = async (req, res, next) => {
  const data = await Contact.create(req.body);
  res.status(201).json(data);
};

const updateById = async (req, res, next) => {
  const {
    params: { contactId },
    body,
  } = req;

  const data = await Contact.findByIdAndUpdate(contactId, body);

  if (!data) {
    throw HttpError(404, "Not Found");
  }
  res.json(data);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await Contact.findOneAndRemove(contactId);

  if (!data) {
    throw HttpError(404, "Not Found");
  }

  res.json(data);
};

const updateFavoriteStatus = async (req, res, next) => {
  const { contactId } = req.params;
   const data = await Contact.findById(contactId);

   if (!data) {
     throw HttpError(404, "Not Found");
   }

   data.favorite = !data.favorite;

  const updatedData = await data.save();
  res.json(updatedData);

};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateFavoriteStatus: ctrlWrapper(updateFavoriteStatus),
};
