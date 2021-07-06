const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../model");
const { contactSchema } = require("../utils/validators");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    message: "success",
    status: 200,
    contacts,
  });
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);

  if (!contact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
    return;
  }

  res.json({
    message: "success",
    status: 200,
    contact: contact,
  });
});

router.post("/", async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);

  if (error) {
    res.status(400).json({
      message: "missing required name field",
      status: 400,
    });
  } else {
    const newContact = await addContact(req.body);
    res.status(201).json({
      message: "success",
      status: 201,
      contact: ("new contact", newContact),
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const removedContact = await removeContact(id);
  if (id === -1) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
    return;
  }

  res.json({
    message: "success",
    status: 200,
    data: ` ${removedContact}`,
  });
});

router.patch("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const { error } = contactSchema.validate(req.body);

  if (error) {
    res.status(400).json({
      message: "missing fields",
      status: 400,
    });
  } else {
    const updatedContact = await updateContact(id, req.body);
    res.json({
      message: "success",
      status: 200,
      data: `contact ${updatedContact} was updated `,
    });
  }
});

module.exports = router;
