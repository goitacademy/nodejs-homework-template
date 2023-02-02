const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const list = await listContacts();
    res.json(list);
    next();
  } catch (error) {
    res.json(`${error}`);
    next();
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(`${req.params.contactId}`);
    if (contact) {
      res.json(contact);
      next();
      return;
    }
    res.json({ message: "Not found", status: "404" });
    next();
  } catch (error) {
    res.json(`${error}`);
    next();
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (name && email && phone) {
      const newContact = await addContact({ name, email, phone });
      res.json(newContact);
      next();
    }
    res.json({ message: "missing required name field" });
    next();
  } catch (error) {
    res.json(`${error}`);
    next();
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const message = await removeContact(`${req.params.contactId}`);
    res.json(message);
    next();
  } catch (error) {
    res.json(`${error}`);
    next();
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (req.body) {
      const updatedContact = await updateContact(
        `${req.params.contactId}`,
        req.body
      );
      res.json(updatedContact);
      next();
    }
    res.json({ message: "missing fields" });
    next();
  } catch (error) {
    res.json(`${error}`);
    next();
  }
});

module.exports = router;
