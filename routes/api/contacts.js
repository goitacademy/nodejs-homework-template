const express = require("express");
const router = express.Router();
const controller = require("../../controllers/contact/index");
const validate = require("../../middlewares/validationMiddleware");
const schema = require("../../schemas/schema")
router.get("/", controller.getAll);

router.get("/:contactId", controller.getById);

router.post("/", validate(schema.schema), controller.add);

router.delete("/:contactId", controller.deleteById);

router.put("/:contactId", validate(schema.schema), controller.updateById);

router.patch("/:contactId/favorite",validate(schema.favoriteSchema), controller.updateStatusContact);

module.exports = router;
