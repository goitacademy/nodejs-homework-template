const express = require("express");
const router = express.Router();

//Import packages
const { authenticate } = require("../../middleware");

//Import modules
const {
  getContactsListController,
  getContactByIdController,
  createContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController
} = require("../../controllers");

const { asyncWrapper } = require("../../helpers");

//Define routes
router.get("/", authenticate, asyncWrapper(getContactsListController));

router.get(
  "/:contactId",
  authenticate,
  asyncWrapper(getContactByIdController)
);

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
