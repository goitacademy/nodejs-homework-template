const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatus,
} = require("../../controllers/contacts.js");

const {
  contactValidationSchema,
  favoriteValidationSchema,
} = require("../../models/contact.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.status(200).json(contacts);
  } catch {
    return res.status(500).send("something went wrong");
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (id.length !== 24) {
    return res
      .status(400)
      .json({ message: "Id needs to be 24 character long" });
  }

  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(contact);
  } catch {
    return res.status(500).send("something went wrong");
  }
});

router.post("/", async (req, res, next) => {
  const { error } = contactValidationSchema.validate(req.body);
  if (error) {
    const value = error.details[0].context.label;
    return res
      .status(400)
      .send({ message: `missing required ${value} - field` });
  }
  try {
    const body = req.body;
    const contact = await addContact(body);
    return res.status(201).json(contact);
  } catch {
    return res.status(500).send("something went wrong");
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (id.length !== 24) {
    return res
      .status(400)
      .json({ message: "Id needs to be 24 character long" });
  }

  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    await removeContact(id);
    return res.status(200).json({ message: "contact deleted" });
  } catch {
    return res.status(500).send("something went wrong");
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;

  if (id.length !== 24) {
    return res
      .status(400)
      .json({ message: "Id needs to be 24 character long" });
  }
  try {
    const contact = await getContactById(id);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    const { error } = contactValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: "missing fields" });
    }

    const updatedContact = await updateContact(id, req.body);
    return res.status(200).json(updatedContact);
  } catch {
    return res.status(500).send("something went wrong");
  }
});

router.patch("/:id/favorite", async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (id.length !== 24) {
    return res
      .status(400)
      .json({ message: "Id needs to be 24 character long" });
  }

  try {
    const contact = await getContactById(id);
    console.log("contact:", contact);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    const { error } = favoriteValidationSchema.validate({ favorite });
    if (error) {
      return res.status(400).send({ message: "missing field favorite" });
    }

    const updatedContact = await updateStatus(id, { favorite });
    return res.status(200).json(updatedContact);
  } catch {
    return res.status(500).send("something went wrong");
  }
});

module.exports = router;