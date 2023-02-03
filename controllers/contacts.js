const { Contact } = require("../models/contact");
const RequestError = require("../helpers/RequestError");

const getAllContacts = async (req, res, _) => {
  const { id } = req.user;

  let { page = 1, limit = 20, favorite } = req.query;

  limit = +limit > 20 ? 20 : +limit;
  const skip = +page > 1 ? +limit * (+page - 1) : 0;

  const sortByFavorite = favorite ? { favorite: -1 } : {};

  const contacts = await Contact.find({ owner: id })
    .skip(skip)
    .limit(limit)
    .sort(sortByFavorite);

  res.status(200).json({ contacts, page: +page, limit });
};

const getContactById = async (req, res, _) => {
  const { id } = req.user;
  const contact = await Contact.findOne({
    owner: id,
    _id: req.params.contactId,
  });

  if (!contact) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(contact);
};

const createContact = async (req, res, _) => {
  const { id } = req.user;
  const contact = await Contact.create({ ...req.body, owner: id });

  if (!contact) {
    throw RequestError(404, "Not found");
  }

  res.status(201).json(contact);
};

const updateContact = async (req, res, _) => {
  const { contactId } = req.params;
  const { id } = req.user;

  const contact = await Contact.findOneAndUpdate(
    { owner: id, _id: contactId },
    req.body,
    {
      new: true,
    }
  );

  if (!contact) {
    throw RequestError(404, "Not found");
  }

  res.status(200).json(contact);
};

const updateContactStatus = async (req, res, _) => {
  const { contactId } = req.params;
  const { id } = req.user;

  const contact = await Contact.findOneAndUpdate(
    { owner: id, _id: contactId },
    req.body,
    { new: true }
  );
  if (!contact) {
    throw RequestError(404, "Not found");
  }

  res.status(200).json(contact);
};

const deleteContact = async (req, res, _) => {
  const { contactId } = req.params;
  const { id } = req.user;

  // const contact = await Contact.findByIdAndRemove(contactId);
  const contact = await Contact.findOneAndRemove({ owner: id, _id: contactId });
  if (!contact) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  updateContactStatus,
  deleteContact,
};
