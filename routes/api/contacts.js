const express = require("express");
const router = express.Router();
const contacts = require("../../models/contacts");
const schemas = require("../../middlewares/schemas/userContactSchemas");
const middleware = require("../../middlewares/validators/contactValidator");

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { params } = req;
  try {
    const result = await contacts.getContactById(params.contactId);
    if (!result) {
      res.status(404).send({ message: "Not Found" });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.post("/", middleware(schemas.addContact), async (req, res, next) => {
  const result = await contacts.addContact(req.body);
		res.json(result);
});

router.delete("/:contactId", async (req, res, next) => {
  const { params } = req;
  try {
    const result = await contacts.removeContact(params.contactId);
    if (!result) {
      res.status(404).json({
        message: "Not Found",
      });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.put("/:contactId", middleware(schemas.updateContact), (req, res, next) => {
  const {
    body,
    params: { contactId },
  } = req;
  const result = contacts.updateContact(contactId, body);
  if (!result) {
    return res.status(404).json({ 
      message: "Not Found"
     });
  } else {
    res.json(result);
  }
});

module.exports = router;
