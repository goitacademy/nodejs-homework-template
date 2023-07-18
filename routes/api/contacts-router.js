const express = require("express");
const router = express.Router();
const { contactsSchema } = require("../../schemas/index.js");
const { validateBody } = require("../../decorators/index.js");
const { contactsController } = require("../../controllers/index.js");

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getById);

router.post("/", validateBody(contactsSchema), contactsController.add);

router.delete("/:id", contactsController.removeById);

router.put("/:id", validateBody(contactsSchema), contactsController.updateById);

module.exports = router;
