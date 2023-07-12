const express = require("express");
const {
  get,
  getById,
  remove,
  update,
  create,
  updateFavorite,
} = require("../../controller/index");

const { authenticate } = require('../../middlewares');

const router = express.Router();
  
router.get("/", authenticate, get);

router.get("/:contactId", authenticate, getById);

router.post("/", authenticate, create);

router.delete("/:contactId", authenticate, remove);

router.put("/:contactId", authenticate, update);

router.patch("/:contactId/favorite", authenticate, updateFavorite);

module.exports = router;
