const express = require("express");
const router = express.Router();

// validation Post і Put
const {
  addPostValidation,
  addPutValidation,
} = require("../../middlewares/valadationMiddleware");

// controllers
const {
  controllerGetAll,
  controllerGetById,
  controllerPost,
  controllerPut,
  controllerDelete,
} = require("../../controllers/controller");

// router
router.get("/", controllerGetAll);
router.get("/:id", controllerGetById);
router.post("/", addPostValidation, controllerPost);
router.put("/:id", addPutValidation, controllerPut);
router.delete("/:id", controllerDelete);

module.exports = router;
