const express = require("express");

const router = express.Router();

const {
  validateContactId,
  validateContactBody,
} = require("../../middlewares/contactsMiddlewares");

const {
  getListContactsController,
  getByIdController,
  addContactController,
  removeContactController,
  putContactController,
} = require("../../controllers/contactController");

router.get("/", getListContactsController);
router.post("/", validateContactBody, addContactController);
router.get("/:contactId", getByIdController);
router.put(
  "/:contactId",
  validateContactBody,
  validateContactId,
  putContactController
);
router.delete("/:contactId", validateContactId, removeContactController);

module.exports = router;
