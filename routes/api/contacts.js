const express = require("express");
// const contactsData = require("../../models/contacts");
const router = express.Router();
// const Joi = require("joi");
const { contacts: controllers } = require("../../controllers");
const { joiSchema } = require("../../models/contact");
const validation = require("../../middlewares/validation");

// const controllerWrapper = (ctrl) => {
//   return async (req, res, next) => {
//     try {
//       await ctrl(req, res, next);
//     } catch (error) {
//       next(error);
//     }
//   };
// };

const validateMiddleware = validation(joiSchema);

// function HttpError(status, message) {
//   const err = new Error(message);
//   err.status = status;
//   throw err;
// }

router.get("/", controllers.getAll);

router.get("/:id", controllers.getById);

router.post("/", validateMiddleware, controllers.add);

router.put("/:id", validateMiddleware, controllers.updateById);

router.delete("/:id", controllers.removeById);

module.exports = router;
