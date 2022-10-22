const express = require("express");
const {
  get,
  getById,
  create,
  remove,
  update,
  favorite,
} = require("../../controller");
const { validContactSchema, contactFavoriteSchema } = require("../../validate");

const router = express.Router();

router.get("/", get);
router.get("/:id", getById);
router.patch("/:id/favorite", contactFavoriteSchema, favorite);
router.post("/", validContactSchema, create);
router.put("/:id", validContactSchema, update);
router.delete("/:id", remove);

module.exports = router;
