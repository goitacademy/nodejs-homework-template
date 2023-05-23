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

const isValidId = require("../../middlewares/isValidId");

router.get("/", getAllMovies);

router.get("/:contactId", isValidId, getById);

router.post("/", validateBody(schemas.contactAddSchema), addContact);

// router.delete("/:contactId", isValidId, deleteContact);

// router.put(
//   "/:contactId",
//   validateBody(schemas.contactAddSchema),
//   isValidId,
//   updateContact
// );

module.exports = router;
