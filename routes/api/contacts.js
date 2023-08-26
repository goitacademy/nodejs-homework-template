const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");

const schemas = require("../../models/contact");

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});
router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);
router.delete("/:id", ctrl.deleteById);

module.exports = router;
// const express = require("express");
// const router = express.Router();

// const ctrl = require("../../controllers/contacts");

// const { validateBody, isValidId } = require("../../middlewares");
// const { schemas } = require("../../models/contact");

// router.get("/", ctrl.getAll);
// router.get("/:id", isValidId, ctrl.getById);
// router.post("/", validateBody(schemas.addSchema), ctrl.add);
// router.put("/:id", isValidId, validateBody(schemas.addSchema), ctrl.updateById);
// router.delete("/:id", isValidId, ctrl.deleteById);
// router.patch(
//   "/:id/favorite",
//   isValidId,
//   validateBody(schemas.updateFavoriteSchema),
//   ctrl.updateStatusContact
// );
// module.exports = router;
