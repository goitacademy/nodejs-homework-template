const express = require("express");
const router = express.Router();
const { Contacts } = require("../models/schema");
const { validatePerson } = require("../models/validation");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { User } = require("../models/schema");

const getContacts = async (req, res) => {
  const owner = req.user.id;
  try {
    const contacts = await Contacts.find({ owner });
    res.json({
      status: "success",
      code: 200,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
    });
  }
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const owner = req.user.id;
  try {
    const contact = await Contacts.findOne({ _id: contactId, owner });
    if (!contact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Contact not found",
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: contact,
      message: "Contact has been found",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
    });
  }
};

const createContact = async (req, res) => {
  const body = req.body;
  const owner = req.user.id;
  const contact = new Contacts({ ...validate.value, owner });

  try {
    await contact.save();
    res.json({
      status: "success",
      code: 201,
      data: contact,
      message: "Contact has been created",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
    });
  }
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const owner = req.user.id;
  try {
    const deletedContact = await Contacts.findOneAndDelete({
      _id: contactId,
      owner,
    });
    if (!deletedContact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Contact not found",
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: deletedContact,
      message: "Contact has been deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
    });
  }
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  const owner = req.user.id; 
  const validate = validatePerson(body);
  try {
    const updatedContact = await Contacts.findOneAndUpdate(
      { _id: contactId, owner }, 
      validate.value,
      { new: true, upsert: true }
    );
    res.json({
      status: "success",
      code: 200,
      data: updatedContact,
      message: "Contact has been created/updated",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
    });
  }
};

router.get("/", getContacts);
router.get("/:contactId", getContactById);
router.post("/", createContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", updateContact);

router.patch("/:contactId/favorite", async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const owner = req.user.id; 
  if (favorite === undefined) {
    return res.status(400).json({ message: "Missing field 'favorite'" });
  }

  try {
    const updatedContact = await Contacts.findOneAndUpdate(
      { _id: contactId, owner }, 
      { favorite },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({
      status: "success",
      code: 200,
      data: updatedContact,
      message: "Contact favorite status updated",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
    });
  }
});

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const avatarURL = gravatar.url(email, { s: "250", d: "retro" }, true);

    const user = new User({ email, password: hashedPassword, avatarURL });
    await user.save();

    res.status(201).json({
      status: "success",
      code: 201,
      data: { email, avatarURL },
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  registerUser,
};