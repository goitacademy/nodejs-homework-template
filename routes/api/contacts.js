const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const contactSchema = require("../schemas/contacts.js");

const jsonParser = express.json();

const router = express.Router();

router.get("/", async (req, res, next) => {
  listContacts()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => next(err));
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  getContactById(contactId)
    .then((data) => {
      if (data === undefined) {
        res.status(404).json({ message: "Not found" });
      }

      res.status(200).json(data);
    })
    .catch((err) => next(err));
});

router.post("/", jsonParser, async (req, res, next) => {
  const body = contactSchema.validate(req.body);
  const contactBody = body.value;

  if (typeof body.error !== "undefined") {
    console.log(body.error);
    return res
      .status(400)
      .json({
        message: body.error.details.map((err) => err.message).join(", "),
      });
    
  }

  addContact(contactBody)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => next(err));
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  removeContact(contactId)
    .then((data) => {
      if (data === null) {
        res.status(404).json({ message: "Not found" });
      }

      res.status(200).json({ message: "Contact deleted" });
    })
    .catch((err) => next(err));
});

router.put("/:contactId", jsonParser, async (req, res, next) => {
  const { contactId } = req.params;
  const body = contactSchema.validate(req.body);
  const contactBody = body.value;

  if (typeof body.error !== "undefined") {
    return res
      .status(400)
      .json({
        message: body.error.details.map((err) => err.message).join(", "),
      });
  }

  updateContact(contactId, contactBody)
    .then((data) => {
      if (data === null) {
        res.status(404).json({ message: "Not found" });
      }

      res.status(200).json(data);
    })
    .catch((err) => next(err));
});

module.exports = router;