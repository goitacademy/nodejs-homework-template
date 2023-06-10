const express = require("express");
const contactController = require("../controllers/contactController");
const router = express.Router();

router.param("contactId", contactController.checkID);
router.route("/").get(contactController.get).post(contactController.create);

router
  .route("/:contactId")
  .get(contactController.getById)
  .put(contactController.update)
  .delete(contactController.remove);

router.route("/:contactId/favorite").patch(contactController.updateStatus);

module.exports = router;
