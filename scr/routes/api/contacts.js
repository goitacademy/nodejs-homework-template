const express = require("express");
const {
  addContactValidation,
  putContactValidation,
  updateStatusValidation,
} = require("../../middlewares/validationMiddleware");
const {
  getContactsController,
  addContactController,
  getContactByIdController,
  deleteContactByIdController,
  putContactByIdController,
  updateStatusContactController,
} = require("../../controllers/contactsController");
const { asyncWrapper } = require("../../helpers/apiHelpes");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = new express.Router();

router.use(authMiddleware);
router
  .route("/")
  .get(asyncWrapper(getContactsController))
  .post(addContactValidation, asyncWrapper(addContactController));

router
  .route("/:contactId")
  .get(asyncWrapper(getContactByIdController))
  .delete(asyncWrapper(deleteContactByIdController))
  .put(putContactValidation, asyncWrapper(putContactByIdController));

router
  .route("/:contactId/favorite")
  .patch(updateStatusValidation, asyncWrapper(updateStatusContactController));

router.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message:
      "Use api on routes: /api/contacts/:contactId or /api/contacts/:contactId/favorite",
    data: "Not found",
  });
});

module.exports = router;
