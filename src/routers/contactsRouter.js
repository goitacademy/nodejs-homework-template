const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../helpers");

// controllers
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  changeContactController,
  changeContactStatusController,
} = require("../controllers");

// middleware for validations
const {
  addContactValidation,
  updateContactValidation,
} = require("../middlewares");

// routers paths
router.get("/", asyncWrapper(getContactsController));
router.get("/:contactId", asyncWrapper(getContactByIdController));
router.post("/", addContactValidation, asyncWrapper(addContactController));
router.delete("/:contactId", asyncWrapper(deleteContactController));
router.put(
  "/:contactId",
  updateContactValidation,
  asyncWrapper(changeContactController)
);
router.patch(
  "/:contactId/favorite",
  asyncWrapper(changeContactStatusController)
);

module.exports = router;
