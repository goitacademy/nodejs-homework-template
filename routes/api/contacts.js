const express = require("express");
const {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  updateContactData,
} = require("../../controllers/controller");
const { isEmptyBody } = require("../../middlewares");
const { contactSchema } = require("../../schemas/contacts-schemas");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getContact);

router.post(
  "/",
  isEmptyBody,
  async (req, res, next) => {
    try {
      await contactSchema.validateAsync(req.body);
      next();
    } catch (error) {
      next(new HttpError(400, error.details[0].message));
    }
  },
  createContact
);

router.delete("/:contactId", deleteContact);

router.put(
  "/:contactId",
  isEmptyBody,
  async (req, res, next) => {
    try {
      await contactSchema.validateAsync(req.body);
      next();
    } catch (error) {
      next(new HttpError(400, error.details[0].message));
    }
  },
  updateContactData
);

module.exports = router;
