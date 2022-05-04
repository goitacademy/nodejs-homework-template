import express from "express";
const {
  getList,
  getById,
  add,
  remove,
  update,
} = require("../../controllers/contacts/index");
const {
  schemaCreateContact,
  schemaUpdateContact,
  schemaMongoId,
} = require("../../models/contacts-validation-schemes");
const { validateBody, validateParams } = require("../../middleware/validation");

const router = express.Router();

router.get("/", getList);

router.get("/:contactId", validateParams(schemaMongoId), getById);

router.post("/", validateBody(schemaCreateContact), add);

router.delete("/:contactId", validateParams(schemaMongoId), remove);

router.put(
  "/:contactId",
  [validateBody(schemaUpdateContact), validateParams(schemaMongoId)],
  update
);

router.patch(
  "/:contactId",
  [validateBody(schemaUpdateContact), validateParams(schemaMongoId)],
  update
);

module.exports = router;
