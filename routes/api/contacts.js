const express = require("express");
const contactControllers = require("../../controllers/contactControllers");
const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const contacts = await contactControllers.listContact();
  res.json(contacts);
});

router.get("/:contactId", authMiddleware, async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactControllers.getContactById(contactId);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  const newContact = await contactControllers.create(req.body);
  res.status(201).json(newContact);
});

router.put("/:contactId", authMiddleware, async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await contactControllers.findByIdAndUpdate(
    contactId,
    req.body,
    {
      new: true,
    }
  );

  if (updatedContact) {
    res.json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.delete("/:contactId", authMiddleware, async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await contactControllers.findByIdAndDelete(contactId);

  if (deletedContact) {
    res.json(deletedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.patch("/:contactId/favorite", authMiddleware, async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const updatedContact = await contactControllers.findByIdAndUpdate(
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
