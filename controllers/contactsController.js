const express = require("express");
const router = express.Router();
const { Contacts } = require("../models/schema");
const { validatePerson } = require("../models/validation");

const getContacts = async (req, res) => {
  const owner = req.user.id; // Pobieramy ID aktualnego użytkownika
  try {
    const contacts = await Contacts.find({ owner }); // Dodajemy filtr "owner"
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
  const owner = req.user.id; // Pobieramy ID aktualnego użytkownika
  try {
    const contact = await Contacts.findOne({ _id: contactId, owner }); // Dodajemy filtr "owner"
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
  const owner = req.user.id; // Pobieramy ID aktualnego użytkownika
  const validate = validatePerson(body);
  const contact = new Contacts({ ...validate.value, owner }); // Ustawiamy właściciela kontaktu

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
  const owner = req.user.id; // Pobieramy ID aktualnego użytkownika
  try {
    const deletedContact = await Contacts.findOneAndDelete({
      _id: contactId,
      owner,
    }); // Dodajemy filtr "owner"
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
  const owner = req.user.id; // Pobieramy ID aktualnego użytkownika
  const validate = validatePerson(body);
  try {
    const updatedContact = await Contacts.findOneAndUpdate(
      { _id: contactId, owner }, // Dodajemy filtr "owner"
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
  const owner = req.user.id; // Pobieramy ID aktualnego użytkownika
  if (favorite === undefined) {
    return res.status(400).json({ message: "Missing field 'favorite'" });
  }

  try {
    const updatedContact = await Contacts.findOneAndUpdate(
      { _id: contactId, owner }, // Dodajemy filtr "owner"
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

module.exports = {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
};