const express = require("express");
const contactsController = require("../../controllers/contacts.controller");
const { validateBody } = require("../../middlewares");
const schemas = require("../../helpers/contacts.schema");

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getOne);

router.post("/", validateBody(schemas.addSchema), contactsController.create);

router.put("/:id", validateBody(schemas.addSchema), contactsController.update);

router.delete("/:id", contactsController.remove);

module.exports = router;
