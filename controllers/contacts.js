const {HttpError, ctrlWrapper} = require("../helpers");

const {Contact} = require("../models/contact");

const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Contact.find({owner}, "-createdAt -updatedAt").populate("owner", "name email");
    res.json(result)
}

const getById = async (req, res) => {
    const {contactId} = req.params;
    const result = await Contact.findById(contactId)
      if(!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result)
}

const add = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Contact.create({...req.body, owner});
    res.status(201).json(result);
}

const updateById = async (req, res) => {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if(!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);
}

const deleteById = async (req, res) => {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndRemove(contactId)
    if(!result) {
     throw HttpError(404, "Not found");
    }
    res.json({
     message: "Contact deleted"
    });
}

const updateFavorite = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  };

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
    updateFavorite: ctrlWrapper(updateFavorite),
}