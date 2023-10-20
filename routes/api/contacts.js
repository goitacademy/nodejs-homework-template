const express = require("express");

const router = express.Router();

const isValidId = require("../../middlewares/isValidId");

const authorization = require("../../middlewares/authenticate");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactsControllers");

// router.use(authorization);

router.get("/", authorization, listContacts);

router.get("/:contactId", authorization, isValidId, getContactById);

router.post("/", authorization, addContact);

router.delete("/:contactId", authorization, isValidId, removeContact);

router.put("/:contactId", authorization, isValidId, updateContact);

router.patch(
  "/:contactId/favorite",
  authorization,
  isValidId,
  updateStatusContact
);

module.exports = router;
