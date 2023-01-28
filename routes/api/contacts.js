const express = require("express");
const contacts_controller = require("../../controllers");
const { controller_exception_wrapper } = require("../../helpers");
const { validate_body } = require("../../middlewares");
const { add_contact_schema } = require("../../helpers/schemas");

const router = express.Router();

router.get("/", controller_exception_wrapper(contacts_controller.get_list));

router.get(
  "/:contactId",
  controller_exception_wrapper(contacts_controller.get_by_id)
);
router.post(
  "/",
  validate_body(add_contact_schema),
  controller_exception_wrapper(contacts_controller.create)
);

router.delete(
  "/:contactId",
  controller_exception_wrapper(contacts_controller.delete_by_id)
);

router.put(
  "/:contactId",
  validate_body(add_contact_schema),
  controller_exception_wrapper(contacts_controller.update)
);

module.exports = router;
