const express = require("express");
const { ctrlWrapper } = require("../../helpers/index");
const validateBody = require("../../middlewares/index");
const { addSchema } = require("../../schema/contacts");

const controllers = require("../../controller/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(controllers.contactsAll));

router.get("/:id", ctrlWrapper(controllers.getContactId));

router.post("/", validateBody(addSchema), ctrlWrapper(controllers.add));

router.delete("/:id", ctrlWrapper(controllers.deleteContact));

router.put(
  "/:id",
  validateBody(addSchema),
  ctrlWrapper(controllers.updateById)
);

module.exports = router;
