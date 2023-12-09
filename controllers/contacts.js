const Contact = require("../models/contact.js");
const { ctrlWrapper, HttpError } = require("../helpers");

const listContacts = async (req, res, next) => {
  const { _id: ownero } = req.user;
  const owner = ownero.toString();
  const favorite = req.query.favorite;
  const { page = 1, limit = 20, ...query } = req.query;
  const skip = (page - 1) * limit;
  if (favorite) {
    await Contact.find({ favorite: true, owner }, { skip, limit });
  }
  console.log(owner);
  const result = await Contact.find(
    { owner, ...query },
    "-createdAt -updatedAt",
    { skip, limit }
  );
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "not found contacts");
  }
  res.status(200).json({ data: result });
};
const addContact = async (req, res, next) => {
  console.log(req.body);
  try {
    const { _id: ownero } = req.user;

    const owner = ownero.toString();
    console.log(owner);
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    HttpError(404, "Not found");
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (!favorite) {
    res.status(400).json({ message: "missing field favorite" });
  }
  const result = await Contact.findByIdAndUpdate(contactId, { favorite });
  if (!result) {
    throw HttpError(404, "not found contacts");
  }
  res.status(200).json({ data: result });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  addContact: ctrlWrapper(addContact),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
