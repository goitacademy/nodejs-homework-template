const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
  const { user } = req;
  const owner = user._id;

  const { page = 1, limit = 21, favorite = true } = req.query;
  const skip = (page - 1) * limit;

  const query = { owner };
  if (favorite === "true") {
    query.favorite = true;
  }

  const result = await Contact.find(query, "-_id", {
    skip,
    limit,
    favorite,
  }).populate("owner", "name");
  res.status(200).json(result);
};

const getContactId = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const postContact = async (req, res) => {
  const { user } = req;
  const owner = user._id;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const putContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const putchContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactId: ctrlWrapper(getContactId),
  postContact: ctrlWrapper(postContact),
  putContact: ctrlWrapper(putContact),
  deleteContact: ctrlWrapper(deleteContact),
  putchContact: ctrlWrapper(putchContact),
};
