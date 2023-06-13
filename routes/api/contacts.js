const express = require("express");
const {
  get,
  getById,
  create,
  remove,
  update,
  updateStatusContact,
} = require("../../controller/index.js");

const {
  contactValidation,
  favoriteValidation,
} = require("../../middlewares/validation.js");

const router = express.Router();
router.get("/", get);
router.get("/:contactId", getById);
router.post("/", contactValidation, create);
router.delete("/:contactId", remove);

router.put("/:contactId", contactValidation, update);

router.patch(
  "/:contactId/favorite",
  favoriteValidation,
  updateStatusContact
);

module.exports = router;