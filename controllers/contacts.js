const {Contact} = require("../schemas");

const { ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.status(200).json(result);
}

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    return res.status(404).json({ message: "Not found"});
  } 
  res.status(200).json(result);
}

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
}

const updateById = async (req, res) => {
  const {id} = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!result) {
    return res.status(404).json({ message: "Not found"});
  }
  res.status(200).json(result);
}

const updateStatus = async (req, res) => {
  const {id} = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!result) {
    return res.status(404).json({ message: "Not found"});
  }
  res.status(200).json(result);
}

const deleteById = async (req, res) => {
  const {id} = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    return res.status(404).json({ message: "Not found"});
  }
  res.status(200).json({ message: "Contact deleted"});
}

module.exports = {
  getAll: ctrlWrapper(getAll), 
  getById: ctrlWrapper(getById), 
  add: ctrlWrapper(add), 
  updateById: ctrlWrapper(updateById), 
  updateStatus: ctrlWrapper(updateStatus),
  deleteById: ctrlWrapper(deleteById),
}