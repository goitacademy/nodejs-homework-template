const express = require("express");

const router = express.Router();

const {
  getContactsListController,
  getContactByIdController,
  createContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controllers");

const { asyncWrapper } = require("../../helpers");

const { authenticate } = require("../../middleware");

router.get("/", authenticate, asyncWrapper(getContactsListController));

router.get("/:contactId", authenticate, asyncWrapper(getContactByIdController));

router.post("/", authenticate, asyncWrapper(createContactController));

router.delete(
  "/:contactId",
  authenticate,
  asyncWrapper(removeContactController)
);

router.put("/:contactId", authenticate, asyncWrapper(updateContactController));

router.patch(
  "/:contactId/favorite",
  authenticate,
  asyncWrapper(updateStatusContactController)
);

module.exports = router;
