const express = require("express");
const router = express.Router();
const { Contacts } = require("../routes/schema");

const { validatePerson } = require("../models/validation");






const getContacts =  (req, res) => {
  try {
    
    const contacts = Contacts.find();
    
    res.json({
      status: "success",
      code: 200,
      data: contacts,
    });
  } catch (error) {
    
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
};

const getContactById =  (req, res) => {
  const { contactId } = req.params;
  try {
    const contact =  Contacts.findById(contactId);

    res.json({
      status: "success",
      code: 200,
      data: contact,
      message: "Contact has been found",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
};

const createContact= (req, res) => {
  const body = req.body;
  const validate = validatePerson(body);
  const contact = new Contacts(validate.value);

  try {
    contact.save();
    res.json({
      status: "success",
      code: 201,
      data: contact,
      message: "Contact has been found created",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
};

const deleteContact=(req, res) => {
  const { contactId } = req.params;
  try {
    const deleteContact = Contacts.deleteOne({ _id: contactId });
    res.json({
      status: "success",
      code: 200,
      data: deleteContact,
      message: "Contact has been deleted",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
};

const updateContact = (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  const validate = validatePerson(body);
  try {
    const contact = Contacts.findOneAndUpdate(
      { _id: contactId },
      validate.value,
      {
        new: true,
        upsert: true,
      }
    );
    res.json({
      status: "success",
      code: 200,
      data: contact,
      message: "Contact has been created/updated",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
    });
  }
};

router.patch("/:contactId/favorite", (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  try {
    const updatedContact =  Contacts.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({
      status: "success",
      code: 200,
      data: updatedContact,
      message: "Contact favorite status updated",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Bad Request",
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

