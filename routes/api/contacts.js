const express = require("express");
const router = express.Router();
const controllers = require("../../controllers");
const { controllerExceptionWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares");
const { addContactSchema } = require("../../helpers/shemas");

router
  .get("/", controllerExceptionWrapper(controllers.getAll))
  .get("/:id", controllerExceptionWrapper(controllers.getById))
  .post(
    "/",
    validateBody(addContactSchema),
    controllerExceptionWrapper(controllers.add)
  )
  .delete("/:id", controllerExceptionWrapper(controllers.deleteById))
  .put(
    "/:id",
    validateBody(addContactSchema),
    controllerExceptionWrapper(controllers.updateById)
  )
  .patch(
    "/:id/favorite",
    controllerExceptionWrapper(controllers.toggleFavorite)
  );

module.exports = router;
