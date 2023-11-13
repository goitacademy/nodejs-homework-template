const express = require("express");

const router = express.Router();
const controllers = require("../../controler/contacts");
const { validate } = require("../../middelwars");
const schema = require("../../shemas/contacts");
router.get("/", controllers.getAll);

router.get("/:id", controllers.getById);

router.post("/", validate(schema.addSchema), controllers.add);

router.delete("/:id", controllers.deleteById);

router.put("/:id", validate(schema.addSchema), controllers.updateById);

module.exports = router;
