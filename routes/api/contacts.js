const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (_, res) => {
  const contacts = await listContacts();

  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);

  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(contact);
});

router.post("/", async (req, res, next) => {
  const contact = await addContact(req.body);

  // if (!newContact) {
  //   res.status(400).json({ message: "missing required name field" });
  //   return;
  // }

  if (typeof contact === "string") {
    const errorMessage = `missing required ${contact} field`;
    // console.log(contact);
    res.status(400).json({ message: errorMessage });
    return;
  }
  res.status(201).json(contact);
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await removeContact(req.params.contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const contact = await updateContact(req.params.contactId, req.body);
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  console.log(`contact: ${contact}`);
  if (contact === null) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  if (typeof contact === "string") {
    const errorMessage = `missing required ${contact} field`;
    res.status(400).json({ message: errorMessage });
    return;
  }

  res.status(200).json(contact);
});

module.exports = router;
