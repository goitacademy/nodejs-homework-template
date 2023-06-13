const express = require("express");
const router = express.Router();
const {
  get,
  getById,
  create,
  remove,
  update,
  changeStatus,
} = require("../../controller");

router.get("/", get);

router.get("/:id", getById);

router.post("/", create);

router.delete("/:id", remove);

router.put("/:id", update);

router.patch("/:id/favorite", changeStatus);
module.exports = router;
