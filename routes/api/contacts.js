const express = require("express");
const {
  getAllController,
  getByIdController,
  postController,
  deleteController,
  putController,
  patchController
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", getAllController);
router.get("/:contactId", getByIdController);
router.post("/", postController);
router.delete("/:contactId", deleteController);
router.put("/:contactId", putController);
router.patch("/:contactId/favorite", patchController)

module.exports = router;
