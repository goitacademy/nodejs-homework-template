const {Contact} = require("../models/contactModel");

const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require('../helpers/ctrlWrapper')

const getAllContacts = async (req, res) => {
  const data = await Contact.find();

    if (!data) {
      throw HttpError(404, "No contacts found");
    }
    res.status(200).json({ data });

}

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const data = await Contact.findById(contactId);

    if (!data) {
      throw HttpError(404, "Not found");
    }
    
    res.status(200).json({ data });
}

const addNewContact = async (req, res) => {
    const data = await Contact.create(req.body);

    if (!data) {
      throw HttpError(404, "Not found");
    }

  res.status(201).json(data);
}

const deleteContactById =  async (req, res) => {
    const { contactId } = req.params;
    const data = await Contact.findByIdAndDelete(contactId);

    if (!data) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json({"message": "contact deleted"});
}

const updateContactById = async (req, res) => {
    const { contactId } = req.params;

  const data = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    { new: true }
  );

    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(data);
}

const updateFavorite = async (req, res) => {
    const { contactId } = req.params;

  const data = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    { new: true }
  );

    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(data);
}

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addNewContact: ctrlWrapper(addNewContact),
  deleteContactById: ctrlWrapper(deleteContactById),
  updateContactById: ctrlWrapper(updateContactById),
  updateFavorite: ctrlWrapper(updateFavorite),
}