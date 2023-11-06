const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const message = await listContacts();

  res.json({
    message,
  });
});

router.get("/:contactId", async (req, res, next) => {
  const contactID = req.params.contactId;
  const message = await getContactById(contactID);
  if (!message) {
    return next();
  }
  res.json({
    message,
  });
});

router.post("/", async (req, res, next) => {
  const response = await addContact(req.body);
  if (response.error) {
    return res
      .status(400)
      .send(response.error.details.map((err) => err.message).join(", "));
  }
  res.status(201);
  res.json(response.newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const response = await removeContact(req.params.contactId);
  if (response.error) {
    return next();
  }

  res.json({
    message: "contact deleted",
  });
});

router.put("/:contactId", async (req, res, next) => {
  const response = await updateContact(req.params.contactId, req.body);
  if (response.error) {
    return res
      .status(400)
      .send(response.error.details.map((err) => err.message).join(", "));
  }
  res.json(response.updatedContact);
});

module.exports = router;
