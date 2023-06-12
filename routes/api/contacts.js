const express = require("express");
const {
  getContactsController,
  getContactsByIdController,
  postContactController,
  deleteContactController,
  putContactController,
  patchContactController,
} = require("../../controller/index.js");

const {
  contactBodyValidation,
  updateFavoriteValidation,
} = require("../../middlewares/validation.js");

const router = express.Router();
router.get("/", getContactsController);
router.get("/:id", getContactsByIdController);
router.post("/", contactBodyValidation, postContactController);
router.delete("/:id", deleteContactController);

router.put("/:id", contactBodyValidation, putContactController);

router.patch(
  "/:id/favorite",
  updateFavoriteValidation,
  patchContactController
);

module.exports = router;