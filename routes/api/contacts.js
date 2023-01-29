const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const { controller } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(controller.getContactsList));

router.get("/:id", ctrlWrapper(controller.getContactById));

router.post(
  "/",
  validation(contactSchema),
  ctrlWrapper(controller.createContact)
);

router.delete("/:id", ctrlWrapper(controller.removeContactById));

router.put(
  "/:id",
  validation(contactSchema),
  ctrlWrapper(controller.updateContactById)
);

module.exports = router;
