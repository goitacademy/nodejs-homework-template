const express = require("express");

const ctrl = require("../../controllers/contacts");

const { authenticate, isValidId } = require("../../middlewares");

const router = express.Router();

router.use(authenticate);

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", ctrl.add);

router.put("/:id", ctrl.updateById);

router.patch(
  "/:id/favorite",

  ctrl.updateFavorite
);

router.delete("/:id", ctrl.deleteById);

module.exports = router;
