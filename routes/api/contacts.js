const express = require("express");
const mongoose = require("mongoose");
const Contact = require("../../models/contactsModel");
const { validateContact } = require("../../validators/contactsValidator");
const { getUserByToken } = require("../../services/usersService");
const { getFavoriteContacts } = require("../../services/contactsService");

const router = express.Router();

const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  next();
};

const getContacts = async (req, res, next) => {
  try {
    const user = await getUserByToken(req.headers.authorization);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const contacts = await Contact.find({ owner: user._id });
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const user = await getUserByToken(req.headers.authorization);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const contact = await Contact.findOne({
      _id: req.params.id,
      owner: user._id,
    });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const user = await getUserByToken(req.headers.authorization);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { error } = validateContact(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const newContact = { ...req.body, owner: user._id };
    const createdContact = await Contact.create(newContact);
    res.status(201).json(createdContact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const user = await getUserByToken(req.headers.authorization);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const contact = await Contact.findOneAndRemove({
      _id: req.params.id,
      owner: user._id,
    });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const user = await getUserByToken(req.headers.authorization);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { error } = validateContact(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { name, email, phone } = req.body;
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: req.params.id, owner: user._id },
      { name, email, phone },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const updateContactFavorite = async (req, res, next) => {
  const { favorite } = req.body;
  if (favorite === undefined) {
    return res.status(400).json({ message: "Missing field favorite" });
  }
  try {
    const user = await getUserByToken(req.headers.authorization);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: req.params.contactId, owner: user._id },
      { $set: { favorite } },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

router.get("/", getContacts);
router.get("/:id", validateObjectId, getContactById);
router.get("/:id/favorite", validateObjectId, getFavoriteContacts);
router.post("/", createContact);
router.delete("/:id", validateObjectId, deleteContact);
router.put("/:id", validateObjectId, updateContact);
router.patch("/:contactId/favorite", updateContactFavorite);

module.exports = router;
