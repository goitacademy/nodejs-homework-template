const contacts = require("../../models/contacts");

const express = require("express");

const contactSchema = require("../../schemas/contacts");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const results = await contacts.listContacts();
    res.json(results);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const results = await contacts.getById(id);
    if (!results) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json(results);
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      const error = new Error("missing required name field");
      error.status = 400;
      throw error;
    }

    const validation = contactSchema.validate({ name, email, phone });
    if (validation.error) {
      const errorMessage = validation.error.details
        .map((error) => error.message)
        .join(", ");
      return res.status(400).send(`Validation Error: ${errorMessage}`);
    }

    const results = await contacts.addContact(name, email, phone);
    res.status(201).json(results);
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message: "Server error",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteContact = await contacts.removeContact(id);
    if (!deleteContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    if (!name && !email && !phone) {
      return res.status(400).json({ message: "missing fields" });
    }
    const body = {};
    if (name) {
      body.name = name;
    }
    if (email) {
      body.email = email;
    }
    if (phone) {
      body.phone = phone;
    }

    const validation = contactSchema.validate(body);
    if (validation.error) {
      const errorMessage = validation.error.details
        .map((error) => error.message)
        .join(", ");
      return res.status(400).send(`Validation Error: ${errorMessage}`);
    }

    const updatedContact = await contacts.updateContact(id, body);

    if (!updatedContact) {
      res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(updatedContact);
  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({
      message: error.message,
    });
  }
});

module.exports = router;
