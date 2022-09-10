const express = require("express");
const {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
} = require("../../controllers/contactControllers");
const {
  addContactValidateMiddleware,
  updateContactValidateMiddleware,
} = require("../../middlewares/validationMiddleware");
const { controllerWrapper } = require("../../helpers/apiHelpers");

const router = express.Router();

router.get("/", controllerWrapper(getAllContactsController));

router.get("/:contactId", controllerWrapper(getContactByIdController));

router.post(
  "/",
  addContactValidateMiddleware,
  controllerWrapper(addContactController)
);

router.delete("/:contactId", controllerWrapper(deleteContactController));

router.put(
  "/:contactId",
  updateContactValidateMiddleware,
  controllerWrapper(updateContactController)
);

module.exports = router;
