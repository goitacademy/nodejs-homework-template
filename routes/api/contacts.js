const express = require("express");

const { catchAsync } = require("../../utils");
const contactsController = require("../../controllers");
const {
  checkContactId,
  checkCreateContactData,
  checkUpdateContactData,
} = require("../../middlewares");
const router = express.Router();

router
  .route("/")
  .get(catchAsync(contactsController.getAll)) // +
  .post(checkCreateContactData, catchAsync(contactsController.addItem)); // +

router.use("/:contactId", checkContactId);
router
  .route("/:contactId")
  .get(catchAsync(contactsController.getById)) // +
  .delete(catchAsync(contactsController.deleteById)) // +
  .put(checkUpdateContactData, catchAsync(contactsController.updateById)); // +

router
  .route("/:contactId/favorite")
  .patch(checkContactId, catchAsync(contactsController.updateFavoriteById));// +

module.exports = router;
