const express = require("express");
const {
  addContactSchema,
  changeContactSchema,
  changeContactStatusSchema,
} = require("./middleware/schemes/validationschemes");

const { validation } = require("./middleware/validationBody");

const router = express.Router();

router.get("/");

router.get("/:contactId");

router.post("/", validation(addContactSchema));

router.delete("/:contactId");

router.put("/:contactId", validation(changeContactSchema));

router.patch("/:contactId/favorite", validation(changeContactStatusSchema));

module.exports = router;
// f9H9gGszGKpK
