import express from "express";

import contactsService from "../../models/contacts.js";

const contactsRouter = express.Router();

// * Get ALL
contactsRouter.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Service error" });
  }
});

// * Get by ID
contactsRouter.get("/:contactId", async (req, res, next) => {
  try {
    const result = await contactsService.getContactById(req.params.contactId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Service error" });
  }
});

// * Post NEW
contactsRouter.post("/", async (req, res, next) => {
  try {
    const result = await contactsService.addContact(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Service error" });
  }
});

// * Delete
contactsRouter.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await contactsService.removeContact(req.params.contactId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Service error" });
  }
});

// *Update
contactsRouter.put("/:contactId", async (req, res, next) => {
  try {
    const result = await contactsService.updateContact(
      req.params.contactId,
      req.body
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Service error" });
  }
});

export default contactsRouter;
