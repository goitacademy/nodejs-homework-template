const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

// router.get("/", ctrlWrapper(ctrl.getAll));

// router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(ctrl.add));

// router.delete("/:id", ctrlWrapper(ctrl.removeById));

// router.put(
//   "/:id",
//   validateBody(schemas.addSchema),
//   ctrlWrapper(ctrl.updateById)
// );

module.exports = router;
