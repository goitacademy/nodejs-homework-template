const express = require("express");
const {
  getList,
  getById,
  add,
  removeById,
  updateById,
} = require("../../controllers/index");
const validateBody = require("../../middlewares/validateBody");
const {
  addingSchema,
  updatingSchema,
} = require("../../schemas/contactsSchema");
const router = express.Router();

router.get("/", getList);

router.get("/:contactId", getById);

router.post("/", validateBody(addingSchema, 400), add);

router.delete("/:contactId", removeById);

router.put(
  "/:contactId",
  validateBody(updatingSchema, 400, "missing fields"),
  updateById
);

module.exports = router;
