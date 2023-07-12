const express = require("express");
const {
  getAllController,
  getByIdController,
  postController,
  deleteController,
  putController,
} = require("./controllers");

const router = express.Router();

router.get("/", getAllController);
router.get("/:contactId", getByIdController);
router.post("/", postController);
router.delete("/:contactId", deleteController);
router.put("/:contactId", putController);

module.exports = router;
