const express = require("express");
const router = express.Router();

const {
  createGameMiddleare,
  buyGameMiddleare,
} = require("../middlewares/validationMiddleware");

const {
  createGameController,
  buyGameController,
} = require("../controllers/gameController");

router.post("/create", createGameMiddleare, createGameController);
router.post("/buy", buyGameMiddleare, buyGameController);

module.exports = router;
