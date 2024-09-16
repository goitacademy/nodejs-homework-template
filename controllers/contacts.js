const Contact = require('../models/contact')

const { HttpError, ctrlWrapper } = require("../helpers");


const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner },
    "-createdAt -updatedAt",
    { skip, limit })
    .populate("owner", "email"); 
    res.status(200).json(result);
}

const getById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.status(200).json(result);
}

const add = async (req, res) => {
  const { _id: owner } = req.user;
    const result = await Contact.create({...req.body, owner});
    res.status(201).json(result)
}

const updateById = async (req, res) => {    
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true} );

    if (!result) {
      throw HttpError(404, "Not found")
    }

    res.status(201).json(result);
}

const updateFavorite = async (req, res) => {    
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true} );

    if (!result) {
      throw HttpError(404, "Not found")
    }

    res.status(201).json(result);
}

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);

    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json({
      message: "contact deleted"
    })
}

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
    updateFavorite: ctrlWrapper(updateFavorite),
}