const express = require("express");
const {
  getAll,
  getById,
  add,
  deleteContactById,
  updateById,
  updateStatusContact,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", add);

router.delete("/:contactId", deleteContactById);

router.put("/:contactId", updateById);
router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
