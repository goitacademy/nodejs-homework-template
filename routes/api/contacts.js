const express = require("express");
const router = express.Router();

const {
  listController,
  getByIdController,
  addController,
  removeController,
  updateControllers,
} = require("../../controllers/contacts");

router.get("/", listController);

router.get("/:id", getByIdController);

router.post("/", addController);

router.delete("/:id", removeController);

router.put("/:id", updateControllers);

module.exports = router;
