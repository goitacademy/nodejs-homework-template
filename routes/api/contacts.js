const express = require("express");
const contactFunction = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const result = await contactFunction.listContacts();
  res.json(result);
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactFunction.getContactById(contactId);
    if (result === null) {
      throw new Error();
    }
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const result = await contactFunction.addContact(req.body);
  res.status(201).json(result);
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactFunction.removeContact(contactId);
    if (result === null) {
      throw new Error();
    }
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactFunction.updateContact(contactId, req.body);
  res.json(result);
});

module.exports = router;
