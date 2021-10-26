const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../model/index");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.status(200).json(data);
});

router.get("/:contactId", async (req, res, next) => {
  const data = await getContactById(req.params.contactId);

  if (!data) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(data);
});

router.delete("/:contactId", async (req, res, next) => {
  const data = await removeContact(req.params.contactId);

  if (!data) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json({ message: "contact deleted" });
});

router.post("/", async (req, res, next) => {
  const data = await addContact(req.body);

  if ("error" in data) {
    return res.status(data.status).json({ message: data.error });
  }

  res.status(201).json(data);
});

router.patch("/:contactId", async (req, res, next) => {
  const data = await updateContact(req.params.contactId, req.body);

  if ("error" in data) {
    return res.status(data.status).json({ message: data.error });
  }

  res.status(200).json(data);
});

module.exports = router;
