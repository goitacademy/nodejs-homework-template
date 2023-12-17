const { Contact } = require('../models/contact');

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

const getById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findById(id);

    if (!result) throw HttpError(404, "Not found");

    res.status(200).json(result);
};

const addNew = async (req, res) => {
    // const { name, email, phone } = req.body;
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

const deleteById = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);

    if (!result) throw HttpError(404, "Not found");

    res.status(200).json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
    const { id } = req.params;
 
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});

    if (!result) throw HttpError(404, "Not found");
    res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
    const { id } = req.params;
 
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});

    if (!result) throw HttpError(404, "Not found");
    res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addNew: ctrlWrapper(addNew),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
 