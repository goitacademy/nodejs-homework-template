const { json } = require("express");
const express = require("express");
const {
  getListContacts,
  getContactsById,
  addNewContact,
  deleteContactById,
  changeContactById,
  updateStatusContact,
} = require("../../controllers/contacts/index");

const router = express.Router();

router.get("/", async (req, res, next) => {
  getListContacts(req, res, next);
});

router.get("/:contactId", async (req, res, next) => {
  getContactsById(req, res, next);
});

router.post("/", async (req, res, next) => {
  addNewContact(req, res, next);
});

router.delete("/:contactId", async (req, res, next) => {
  deleteContactById(req, res, next);
});

router.put("/:contactId", async (req, res, next) => {
  changeContactById(req, res, next);
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  updateStatusContact(req, res, next);
});

module.exports = router;
