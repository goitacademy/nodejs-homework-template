const {Contact} = require("../models/contact.js");
const ctrlWrapper = require("../helpers/ctrlWrapper.js");

const getAll = async (req, res) => {
  const { id: owner } = req.user
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const skip = ( page - 1 ) * limit;

    const result = await Contact.find({owner}).skip(skip).limit(limit);
    res.status(200).json({
      data: result,
      currentPage: page,
      TotalPages: Math.ceil(await Contact.countDocuments({ owner }) / limit),
      totalItems: await Contact.countDocuments({ owner })
    }
    );
  } catch (error) {
    res.status(500).json({message: "Ебать сломалось"})
  }
};

const getAllFavoriteOrNot = async (req, res) => {
  const { id: owner } = req.user
  const { favorite } = req.params
  console.log(favorite);
  
  try {
    const result = await Contact.find({ owner, favorite });
    if (!result) {
      res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(result);
  } catch {
    res.status(400).json({ message: "Missing favorite" });
  }
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const { id: owner } = req.user

  const result = await Contact.findOne({ _id: contactId,  owner });
  if (!result) {
    res.status(404).json({ message: "Contact not found" });
  }
  res.json(result);
};

const add = async (req, res) => {
  const { id: owner } = req.user
  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { id: owner } = req.user

  try {
    const result = await Contact.findOneAndUpdate({ _id: contactId, owner }, req.body, { new: true });
    if (!result) {
      res.status(404).json({ message: "Contact not found" });
    }
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: "Contact not found" });
  }
};

const deletebyId = async (req, res) => {
  const { contactId } = req.params;
  const { id: owner } = req.user;

  const result = await Contact.findOneAndDelete({ _id: contactId, owner })
  if (!result) {
    res.status(404).json({ message: 'Contact not found'})
  }

  res.status(200).json({
    message: `Contact with id: ${contactId} has been deleted`,
  });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { id: owner } = req.user;

  if (!req.body || req.body.favorite === undefined ) {
    res.json({
      status: 400,
      message: "missing field favorite"
    })
    return;
  }

  const result = await Contact.findOneAndUpdate({ _id: contactId, owner }, req.body, { new: true });
    if (!result) {
      res.status(404).json({ message: 'Contact not found'})
    }
    res.status(200).json({data: result});
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getAllFavoriteOrNot: ctrlWrapper(getAllFavoriteOrNot),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deletebyId: ctrlWrapper(deletebyId),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};