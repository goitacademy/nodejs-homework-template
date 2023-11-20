const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");

const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contact");

router.get("/", ctrlWrapper(ctrl.getAll));
router.get("/:contactId", ctrlWrapper(ctrl.getById));
router.post("/", validateBody(schemas.addSchema), ctrlWrapper(ctrl.add));
router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

// router.get("/", async (req, res, next) => {
//   res.json(contacts);
// });

// router.post("/", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.delete("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.put("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

module.exports = router;
