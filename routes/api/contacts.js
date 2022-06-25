const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  add,
  update,
  updateStatusContact,
  remove,
} = require("../../controllers");
const auth = require("../../middlewares/auth");

router.get("/", auth, getAll);

router.get("/:contactId", getById);

router.post("/", auth, add);

router.put("/:contactId", update);

router.patch("/:contactId/favorite", updateStatusContact);

router.delete("/:contactId", remove);

module.exports = router;
