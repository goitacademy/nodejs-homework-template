const express = require("express");
const { schemas } = require("../../models/contact");

const { HttpError } = require("../../helpers/index");
const { isValidId, validateBody } = require("../../middleware/index");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateStatusContact,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", isValidId, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await getContactById(contactId.slice(1));

    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ status: "success", data });
  } catch (err) {
    next(err);
  }
});

router.post("/", validateBody(schemas.addSchema), addContact);

router.delete("/:contactId", isValidId, async (req, res, next) => {
  try {
    const data = await removeContact(req.params.contactId.slice(1));

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;
