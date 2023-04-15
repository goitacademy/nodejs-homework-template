const express = require("express");

const { catchAsync } = require("../../utils");
const { contactsController } = require("../../controllers");

const {
  checkContactId,
  checkCreateContactData,
  checkUpdateContactData,
  checkAuth,
} = require("../../middlewares");
const router = express.Router();

router
  .route("/")
  .get(checkAuth, catchAsync(contactsController.getAll)) 
  .post(checkAuth, checkCreateContactData, catchAsync(contactsController.addItem));

router.use("/:contactId", checkContactId);
router
  .route("/:contactId")
  .get(catchAsync(contactsController.getById)) 
  .delete(checkAuth, catchAsync(contactsController.deleteById)) 
  .put(checkAuth, checkUpdateContactData, catchAsync(contactsController.updateById)); 

router
  .route("/:contactId/favorite")
  .patch(checkAuth, checkContactId, catchAsync(contactsController.updateFavoriteById));

module.exports = router;