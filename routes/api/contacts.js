const express = require("express");
const router = express.Router();
const control = require("../../controlers/control");
const { validateBody } = require("../../middlewares/validateBody");
const {
  checkCreateUserData,
  checkId,
} = require("../../middlewares/validateBody");
const schemas = require("../../Shema/shema");
//======================getAll==========================
router.get("/", control.getAll);
//========================getID========================
router.get("/:contactId", control.getID);
//=======================post=========================
router.post(
  "/",
  checkCreateUserData,
  validateBody(schemas.contactSchema),
  control.post
);
//=======================delete=========================
router.delete("/:contactId", checkId, control.delet);
//========================put========================
router.put(
  "/:contactId",
  checkId,
  validateBody(schemas.contactSchema),
  control.put
);

//========================favorite============/api/contacts/:contactId/============

router.patch("/:contactId", async (req, res) => {
  const { contactId } = req.body;
  const { body } = req;

  const result = await Contact.findByIdAndUpdate(contactId, body);
  if (result) {
    res.json({ contact: result });
  } else {
    HttpError(404, "Not found");
  }
});

module.exports = router;
