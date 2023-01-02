const { json } = require("express");
const express = require("express");
const {
  getListContacts,
  getContactsById,
  addNewContact,
  deleteContactById,
  changeContactById,
} = require("../../controllers/controllers");

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

module.exports = router;
