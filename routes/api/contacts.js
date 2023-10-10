const express = require("express");

const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  res.status(200);
  const data = await listContacts();
  res.json(data);
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  if (id) {
    res.status(200);
    const data = await getContactById(id);
    res.json(data);
  } else {
    res.status(404);
    res.json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  if (body.name || body.email || body.phone) {
    const data = await addContact(body);
    const { statusCode, message } = data;
    res.status(statusCode);
    res.json(message);
  } else {
    res.status(400);
    res.json({ message: "missing required name field" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const _id = req.params.contactId;
  if (_id) {
    res.status(200);
    const data = await removeContact(_id);
    res.json(data);
  } else {
    res.status(404);
    res.json({ message: "Id not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;
  if (!body) {
    res.status(404);
    res.json({ message: "Missing required fields!" });
  } else {
    const { codeStatus, message } = await updateContact(contactId, body);
    res.status(codeStatus);
    res.json(message);
  }
});
router.patch("/:contactId/favourite", async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;
  if (!body) {
    res.status(404);
    res.json({ message: "Missing required fields!" });
  } else {
    const { codeStatus, message } = await updateContactStatus(contactId, body);
    res.status(codeStatus);
    res.json(message);
  }
});

module.exports = router;
