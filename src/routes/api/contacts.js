const express = require("express");
const {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controllers/contactController");

const { authMiddleware } = require("../../middlewares/authMiddleware");

const {
  postValidation,
  putValidation,
  patchValidation,
} = require("../../middlewares/validationMiddleware");

const router = new express.Router();

router.use(authMiddleware);

router.get("/", listContactsController);
router.get("/:contactId", getContactByIdController);
router.post("/", postValidation, addContactController);
router.delete("/:contactId", removeContactController);
router.put("/:contactId", putValidation, updateContactController);
router.patch(
  "/:contactId/favorite",
  patchValidation,
  updateStatusContactController
);

module.exports = router;
