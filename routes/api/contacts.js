const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contactControllers");

router.get("/", async (req, res, next) => {
  await listContacts(req, res, next);
});

router.get("/:contactId", async (req, res, next) => {
  await getContactById(req, res, next);
});

router.post("/", async (req, res, next) => {
  await addContact(req, res, next);
});

router.delete("/:contactId", async (req, res, next) => {
  await removeContact(req, res, next);
});

router.put("/:contactId", async (req, res, next) => {
  await updateContact(req, res, next);
});

module.exports = router;
