const express = require("express");
const router = express.Router();
const controlers = require("../../controlers");
const { validateBody } = require("../../middlewares/validateBody");
const {
  checkCreateUserData,
  checkId,
} = require("../../middlewares/validateBody");
const schemas = require("../../Shema/shema");
//======================getAll==========================
router.get("/", controlers.userController.getAllUser);
//========================getID========================
// router.get("/:contactId", controlers.userController.getID);
//=======================post=========================
router.post(
  "/",
  checkCreateUserData,
  validateBody(schemas.contactSchema),
  controlers.userController.createUser
);
//=======================delete=========================
router.delete("/:userId", checkId, controlers.userController.deletUser);
//========================put========================
router.put(
  "/:userId",
  checkId,
  validateBody(schemas.contactSchema),
  controlers.userController.updateUser
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

//========================get all users========================
router.get("/users", controlers.userController.getAllUser);

module.exports = router;
