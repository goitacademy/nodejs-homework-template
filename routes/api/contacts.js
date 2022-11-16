const express = require("express");
const contactsModels = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json(await contactsModels.listContacts());
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await contactsModels.getContactById(req.params.contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(contact);
});
router.post("/", async (req, res, next) => {
  const addedContactStatus = await contactsModels.addContact(req.body);
  if (typeof addedContactStatus === "string") {
    res
      .status(400)
      .json({ message: `missing required name field: ${addedContactStatus}` });
  }
  res.status(201).json(addedContactStatus);
});

router.delete("/:contactId", async (req, res, next) => {
  if (!(await contactsModels.removeContact(req.params.contactId))) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (name || email || phone) {
    const contactUpdateStatus = await contactsModels.updateContact(
      req.params.contactId,
      req.body
    );

    if (contactUpdateStatus === 404) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    if (typeof contactUpdateStatus === "string") {
      res.status(400).json({
        message: `missing required name field: ${contactUpdateStatus}`,
      });
      return;
    }

    res.json(contactUpdateStatus);
  }
  res.status(400).json({ message: "missing fields" });
});

module.exports = router;
