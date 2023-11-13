const express = require("express");
const contactSchema = require("../../schemas/contacts");
const HttpError = require("../../helpers/HttpError");
const Contact = require("../../controllers/contact");
const contacts = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const results = await contacts.listContacts();
    res.json(results);
  } catch (error) {
    next(new HttpError(500, "Server error"));
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getById(id);
    if (!result) {
      throw new HttpError(404, "Contact not found");
    }
    res.json(result);
  } catch (error) {
    next(
      error instanceof HttpError ? error : new HttpError(500, "Server error")
    );
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      throw new HttpError(400, "Missing required name, email, or phone field");
    }

    const validation = contactSchema.validate({ name, email, phone });
    if (validation.error) {
      throw new HttpError(
        400,
        `Validation Error: ${validation.error.details
          .map((e) => e.message)
          .join(", ")}`
      );
    }

    const result = await contacts.addContact({ name, email, phone });
    res.status(201).json(result);
  } catch (error) {
    next(
      error instanceof HttpError ? error : new HttpError(500, "Server error")
    );
  }
});

router.patch("/:id/favorite", async (req, res) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;

    if (favorite === undefined) {
      return res.status(400).json({ message: "missing field favorite" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({
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
