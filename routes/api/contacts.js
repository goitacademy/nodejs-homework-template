const express = require("express");

const { contacts: ctrl } = require("../../controllers/index");
const ctrlWrapper = require("../../middlewares/ctrlWrapper");
const router = express.Router();

const {
  addContactValidation,
} = require("../../middlewares/validationMiddleware");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrlWrapper(ctrl.getById));

<<<<<<< Updated upstream
router.post("/", addContactValidation,ctrlWrapper( ctrl.add));
=======
router.post("/", addContactValidation, ctrlWrapper(ctrl.add));
>>>>>>> Stashed changes

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put("/:contactId", addContactValidation, ctrlWrapper(ctrl.updateById));

module.exports = router;
