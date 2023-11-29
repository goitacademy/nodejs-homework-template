const express = require("express");
const {
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  updateContactData,
  updateContactStatus,
} = require("../../controllers/controller");
const { isEmptyBody } = require("../../middlewares");
const { contactSchema } = require("../../schemas/contacts-schemas");
const { controlWrapper, bodyValidator } = require("../../decorators");
const { updateStatusContact } = require("../../models/contacts");

const router = express.Router();

router.get("/", controlWrapper(getAllContacts));

router.get("/:contactId", controlWrapper(getContact));

router.post(
  "/",
  isEmptyBody,
  bodyValidator(contactSchema),
  controlWrapper(createContact)
);

router.delete("/:contactId", controlWrapper(deleteContact));

router.put(
  "/:contactId",
  isEmptyBody,
  bodyValidator(contactSchema),
  controlWrapper(updateContactData)
);

router.patch(
  "/:contactId/favorite",
  controlWrapper(async (req, res, next) => {
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
  })
);

module.exports = router;
