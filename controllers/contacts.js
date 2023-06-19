const Contact = require("../models/contact");

const { HttpError, ctrlWrappers } = require("../helpers");


const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5, ...query} = req.query;
  const skip = (page - 1) * limit;
      const result = await Contact.find({owner, ...query},  "-createdAt -updatedAt", { skip, limit});
      res.json(result);
}

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById({_id: contactId });
    if (!result) {
      throw HttpError(404, "Not found");
    }
  res.json(result)
}

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
      res.status(201).json(result);
}

const updateFavorite = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById({_id: contactId });
    if (!result) {
      throw HttpError(404, "Not found");
    }
  res.json(result)
}

const removeContact = async (req, res) => {
 const {contactId} = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
}

const updateContact = async (req, res) => {
    const {contactId} = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
 if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
}

module.exports = {
    getAll: ctrlWrappers(getAll),
    getById: ctrlWrappers(getById),
    addContact: ctrlWrappers(addContact),
    updateFavorite: ctrlWrappers(updateFavorite),
    removeContact: ctrlWrappers(removeContact),
    updateContact: ctrlWrappers(updateContact),
}