const express = require("express");

const actions = require("../../models/contacts.js");
const { validationForAddingContact } = require("../../utils/validation");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await actions.listContacts();
  res.status(200).json({
    data: { contacts },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await actions.getContactById(contactId);
  if (contact) {
    return res.status(200).json({
      data: { contact },
    });
  }

  res.status(404).json({
    message: "Not found",
  });
});

router.post("/", async (req, res, next) => {
  console.log(validationForAddingContact(req.body));
  if (validationForAddingContact(req.body).error) {
    return res.status(400).json({
      message: "Missing required name field",
    });
  }

  const contact = await actions.addContact(req.body);
  res.status(201).json({
    data: { contact },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await actions.removeContact(contactId);

  if (contact) {
    return res.status(200).json({
      message: "Contact deleted",
    });
  }

  res.status(404).json({
    message: "Not found",
  });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await actions.updateContact(contactId, req.body);

  switch (contact) {
    case "not-found":
      res.status(404).json({
        message: "Not found",
      });
      break;

    case "bad-request":
      res.status(400).json({
        message: "Missing required name field",
      });
      break;

    default:
      res.status(200).json({
        data: { contact },
      });
      break;
  }
});

module.exports = router;
