const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const contacts = require("../../models/contacts.js");

// const nanoid = require("nanoid");

router.get("/", async (req, res, next) => {
  try {
    const listOfContacts = await contacts.listContacts();

    res.status(200).json({
      listOfContacts,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contacts.getContactById(id);

    if (contact) {
      res.status(200).json({
        contact,
      });
    }

    res.status(404).json({
      message: "contact not found",
    });
  } catch (error) {}
});
router.use(express.json());
router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (name === "" || email === "" || phone === "") {
      res.status(400).json({
        message: "missing required field",
      });
    }

    const onUpdate = await contacts.addContact(name, email, phone);

    res.status(201).json({
      onUpdate,
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedContact = contacts.removeContact(id);
    if (deletedContact) {
      res.status(200).json({
        message: "contact deleted",
        deletedContact,
      });

      res.status(404).json({
        message: "there is no such contact to delete",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    if (!body) {
      res.status(400).json({ message: "missing fields" });
    }
    const contactToUpdate = await contacts.updateContact(id, body);
    if (contactToUpdate) {
      res.status(200).json({
        contactToUpdate,
      });

      res.status(404).json({
        message: "not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
