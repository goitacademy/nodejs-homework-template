const express = require("express");
const router = express.Router();

// validation Post і Put
const {
  addPostValidation,
  addPutValidation,
  updateFavoriteStatusValidation,
} = require("../../middlewares/valadationMiddleware");

// wrapper for controllers
const { asyncWrapper } = require("../../helpers/apiHelpers");

// controllers
const {
  controllerGetAll,
  controllerGetById,
  controllerPost,
  controllerPut,
  controllerDelete,
  controllerUpdateStatusContact,
} = require("../../controllers/controller");

// router
router.get("/", asyncWrapper(controllerGetAll));
router.get("/:id", asyncWrapper(controllerGetById));
router.post("/", addPostValidation, asyncWrapper(controllerPost));
router.put("/:id", addPutValidation, asyncWrapper(controllerPut));
router.delete("/:id", asyncWrapper(controllerDelete));
router.patch(
  "/:id/favorite",
  updateFavoriteStatusValidation,
  asyncWrapper(controllerUpdateStatusContact)
);

module.exports = router;
// =============================
