const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.newBody), ctrl.add);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.newBody),
  ctrl.updateById
);

router.patch(
  "/:id/favorite",
  authenticate,
  (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "missing field favorite" });
    }
    next();
  },
  isValidId,
  validateBody(schemas.updateFavorite),
  ctrl.updateFavorite
);

router.delete(
  "/:id",
  authenticate,
  isValidId,

  ctrl.deleteById
);

module.exports = router;
