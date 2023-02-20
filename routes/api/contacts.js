const express = require("express");
const controllers = require("../../controller/contacts");
const { ctrlWrapper } = require("../../helpers/index");
const validateBody = require("../../middlewares");
const { addSchema, updateSchema } = require("../../schema/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(controllers.getAll));

router.post("/", validateBody(addSchema), ctrlWrapper(controllers.add));

router.get("/:contactId", ctrlWrapper(controllers.getById));

router.delete("/:contactId", ctrlWrapper(controllers.deleteById));

router.put(
  "/:contactId",
  validateBody(updateSchema),
  ctrlWrapper(controllers.updateById)
);

module.exports = router;
