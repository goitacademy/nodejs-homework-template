const express = require("express");

const {
  getAllMovies,
  getById,
  addContact,
  deleteContact,
  updateContact,
} = require("../../controllers/contacts-controller");

const schemas = require("../../models/contact");

const { validateBody } = require("../../decorators");

const router = express.Router();

router.get("/", getAllMovies);

// router.get("/:contactId", getById);

router.post("/", validateBody(schemas.contactAddSchema), addContact);

// router.delete("/:contactId", deleteContact);

// router.put(
//   "/:contactId",
//   validateBody(schemas.contactAddSchema),
//   updateContact
// );

module.exports = router;
