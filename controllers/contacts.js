const Contact = require("../models/contact")

const { HttpError, ctrlWrappers } = require("../helpers")


const getAll = async (req, res) => {
      const result = await Contact.find();
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
  const result = await Contact.create(req.body);
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