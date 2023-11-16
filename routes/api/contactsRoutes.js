const express = require("express");

const controller = require("../../controllers/contacts");
const {
  checkContactById,
  checkCreateContactById,
  checkUpdateContactById,
  checkUpdateContactFavorite,
} = require("../../middlewares/contactsMidlewares");

const router = express.Router();

router
  .route("/")
  .post(checkCreateContactById, controller.addContact)
  .get(controller.getAllContacts);

router.use("/:id", checkContactById);
router
  .route("/:id")
  .get(controller.getContactById)
  .put(checkUpdateContactById, controller.updateContact)
  .delete(controller.removeContact);
router
  .route("/:id/favorite")
  .patch(checkUpdateContactFavorite, controller.updateContactFavorite);

module.exports = router;
