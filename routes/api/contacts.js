const express = require("express");

const router = express.Router();

const controllers = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

router.get("/", controllers.getAll);

router.get("/:contactId", controllers.getById);

router.post("/", validateBody(schemas.addSchema), controllers.add);

router.delete("/:contactId", controllers.deleteById);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  controllers.updateById
);

module.exports = router;
