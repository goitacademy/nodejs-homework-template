const express = require("express");
const createError = require("http-errors");
const { Contact, joiSchema, joiBoolSchema } = require("../../models/contact");
const ctrl = require("../../controllers");
const { auth, validation, ctrlWrapper } = require("../../middleware");

const router = express.Router();

router.get("/", auth, validation(joiSchema), ctrlWrapper(ctrl.getAll));

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await await Contact.findById(id);
    if (!contact) {
      // eslint-disable-next-line new-cap
      throw new createError(404, `Contact with id = ${id} not found`);
    }
    res.json({ status: "success", code: 200, contact });
  } catch (error) {
    next(error);
  }
});
router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.add));

router.put("/:contactId", validation(joiSchema), ctrlWrapper(ctrl.updateById));

router.patch(
  "/:contactId/favorite",
  validation(joiBoolSchema),
  ctrlWrapper(ctrl.updateFavoriteById)
);

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const data = await Contact.findByIdAndRemove(id);
    if (!data) {
      // eslint-disable-next-line new-cap
      throw new createError.NotFound(404, "Contact not found");
    }
    res.status(200).json({ message: "contact deleted", data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
