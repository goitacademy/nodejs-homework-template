const express = require("express");
const controllers = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");

const schema = require("../../scheme/joi");

const router = express.Router();

router.get("/", controllers.getAll);

router.get("/:contactId", controllers.getById);

router.post("/", validateBody(schema), controllers.add);

router.delete("/:contactId", controllers.removeById);

router.put("/:contactId", validateBody(schema), controllers.updateById);

module.exports = router;
