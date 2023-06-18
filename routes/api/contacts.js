const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contactsList = await listContacts();
    res.json({ status: "success", code: 200, data: contactsList });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await getContactById(contactId);

    if (contact.length > 0) {
      res.json({ status: "success", code: 200, data: contact });
    } else {
      res.status(404).json({
        status: `Contact ${req.params.contactId} not found`,
        code: 404,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (req.body.name && req.body.email && req.body.phone) {
      await addContact(req.body);
      res.json({ status: "success", code: 201, data: "Contact added" });
    } else {
      res.status(400).json({
        status: "Missing required field",
        code: 400,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  try {
    const isRemoved = await removeContact(contactId);
    console.log(isRemoved);
    if (isRemoved) {
      res.json({
        message: `Contact with ID ${req.params.contactId} was succesfully removed`,
      });
    } else {
      res.status(404).json({
        status: "Not found",
        code: 400,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (req.body.name && req.body.email && req.body.phone) {
      await updateContact(req.params.contactId, req.body);
      res.json({
        message: `Contact with ID ${req.params.contactId} was succesfully updated`,
      });
    } else {
      res.status(400).json({
        status: "Missing required field",
        code: 400,
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
