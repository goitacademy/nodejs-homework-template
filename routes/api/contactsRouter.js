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
} = require("../../controller/contactsController");
const { auth } = require("../../middleware/authMiddleware");
const router = express.Router();
router.use(auth);
router.get("/", get);

router.get("/:contactId", getById);

router.post("/", addPostValidation, create);

router.delete("/:contactId", remove);

router.put("/:contactId", updatePostValidation, update);
router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
