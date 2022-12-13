const express = require("express");

const { getContact } = require("../../controllers/getContact");
const { getById } = require("../../controllers/getById");
const { add } = require("../../controllers/addContact");
const { deleteContact } = require("../../controllers/deleteContact");
const { update } = require("../../controllers/updateContact");
const { updateFavorite } = require("../../controllers/updateFavorite");

// http://localhost:3000/api/contacts
//  npx nodemon server.js

const { validate } = require("../../schema/schema");
const { contact, favoriteJoySchema } = require("../../schema/midleware");

const router = express.Router();

router.get("/", getContact);

router.get("/:contactId", getById);

router.post("/", validate(contact), add);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", validate(contact), update);

router.patch(
  "/:contactId/favorite",
  validate(favoriteJoySchema),
  updateFavorite
);

module.exports = router;
