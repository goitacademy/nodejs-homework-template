const {Contact} = require("../models/contact.js");
const HttpError  = require("../helpers/HttpError.js");
const ctrlWrapper = require("../helpers/ctrlWrapper.js");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found").HttpError;
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate( contactId , req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found").HttpError;
  }
  res.json(result);
};

const deletebyId = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOneAndDelete({ _id: contactId});
  if (!result) {
    throw HttpError(404, "Not found").HttpError;
  }
  res.json({
    message: `Contact with id: ${contactId} has been deleted`,
  });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  if (!req.body || req.body.favorite === undefined ) {
    res.json({
      status: 400,
      message: "missing field favorite"
    })
    return;
  }

    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!result) {
      throw HttpError(404, "Not found").HttpError;
    }
    res.json({
      status: 200,
      data: result,
    });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deletebyId: ctrlWrapper(deletebyId),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};