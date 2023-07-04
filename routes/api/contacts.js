const contactsModel = require("../../models/contacts");
const express = require("express");
const nanoid = import("nanoid");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json(await contactsModel.listContacts());
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await contactsModel.getContactById(req.params.contactId);
  if (contact) {
    res.json(contact);
    return;
  }
  res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const contact = { name, email, phone };
  if (
    Object.keys(contact).every((field) => {
      if (contact[field] !== undefined) {
        return true;
      }
      res.json({ message: `missing required field - ${field}` });
      return false;
    })
  ) {
    contactsModel.addContact({ id: nanoid(), ...contact });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
