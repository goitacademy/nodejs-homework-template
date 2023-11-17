const express = require("express");
const Contact = require("../controllers/contactControllers");

const router = express.Router();

router.get("/", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
});

router.put("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (updatedContact) {
    res.json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndDelete(contactId);

  if (deletedContact) {
    res.json(deletedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.patch("/:contactId/favorite", async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );

  if (updatedContact) {
    res.json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
