const express = require("express");

const { catchAsync } = require("../../utils");
const contactsController = require('../../controllers');
const router = express.Router();

router.get(
  "/",
  catchAsync(contactsController.getAll)
);

router.get(
  "/:contactId",
  catchAsync(contactsController.getById)
);

router.post(
  "/",
  catchAsync(contactsController.addItem)
);

router.delete(
  "/:contactId",
  catchAsync(contactsController.deleteById)
);

router.put("/:contactId", contactsController.updateById);

module.exports = router;