const express = require("express");
const router = express.Router();
const controlers = require("../../controlers/");
const { validateBody } = require("../../middlewares/validateBody");
const {
  checkCreateUserData,
  checkId,
} = require("../../middlewares/validateBody");
const schemas = require("../../Shema");
//======================getAll==========================
router.get("/", controlers.contactsController.getAll);
//========================getID========================
router.get("/:contactId", controlers.contactsController.getID);
//=======================post=========================
router.post(
  "/",
  checkCreateUserData,
  validateBody(schemas.contactSchema),
  controlers.contactsController.post
);
//=======================delete=========================
router.delete("/:contactId", checkId, controlers.contactsController.delet);
//========================put========================
router.put(
  "/:contactId",
  checkId,
  validateBody(schemas.contactSchema),
  controlers.contactsController.put
);

//========================favorite============/api/contacts/:contactId/============

router.patch("/:contactId/favorite", async (req, res) => {
  const { contactId } = req.body;
  const { body } = req;
  const result = await Contact.findByIdAndUpdate(contactId, body);
  if (result) {
    res.json({ contact: result });
  } else {
    HttpError(404, "Not found");
  }
});

//========================get all users========================
router.get("/users", controlers.contactsController.getAllUser);

module.exports = router;
