const express = require("express");

const { contactSchema } = require("../../schemas");
const { controllerWrapper, validation } = require("../../middlewares");
const { contacts } = require("../../controllers");

const router = express.Router();

router.get("/", controllerWrapper(contacts.getAll));

// router.get("/:contactId", controllerWrapper(contacts.getById));

// router.post("/", validation(contactSchema), controllerWrapper(contacts.add));

// router.delete("/:contactId", controllerWrapper(contacts.removeById));

// router.patch(
//   "/:contactId",
//   validation(productSchema),
//   controllerWrapper(contact.updateById)
// );

module.exports = router;
