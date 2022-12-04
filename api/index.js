const express = require("express");
const router = express.Router();

const {
  get,
  getById,
  create,
  update,
  updateStatus,
  remove,
} = require("../controller");

router.get("/", get);

router.get("/:contactId", getById);

router.post("/", create);

router.delete("/:contactId", remove);

router.put("/:contactId", update);

router.patch("/:contactId/favorite", updateStatus);

module.exports = router;
