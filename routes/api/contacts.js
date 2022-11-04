const express = require("express");

const {
  addPostValidation,
  updatePostValidation,
} = require("../../middleware/validation");

const {
  get,
  getById,
  remove,
  create,
  update,
  updateStatusContact,
} = require("../../controller/index");
const router = express.Router();

router.get("/", get);

router.get("/:contactId", getById);

router.post("/", addPostValidation, create);

router.delete("/:contactId", remove);

router.put("/:contactId", updatePostValidation, update);
router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
