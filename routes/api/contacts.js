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
const { updateStatusContact } = require("../../models/contacts");

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

router.patch("/:contactId/favorite", async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined && Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Missing field favorite" });
  }

  try {
    const updatedContact = await updateStatusContact(contactId, { favorite });
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(new HttpError(500, "Internal Server Error"));
  }
});

module.exports = router;
