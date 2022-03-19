const express = require("express");
const ContactsController = require("../api/controllers.js");
const { joiSchema,favoriteShcema } = require("../../models/contacts.js");
const { validateBody } = require("../../middlewares/validation.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await ContactsController.listContacts();
  res.json({ status: "success", code: 200, payload: { contacts } });
});

router.get("/:contactId", async (req, res, next) => {
  try{
    const contact = await ContactsController.getContactById(req.params.contactId);
    return res.json({ status: "success", code: 200, payload: { contact } });
  }catch(error) {
    return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not Found" });
  }
});
//
router.post("/", validateBody(joiSchema), async (req, res, next) => {
  try{
    const contact = await ContactsController.addContact(req.body);
    return res
        .status(201)
        .json({ status: "success", code: 201, payload: { contact } });
  }catch(error){
    return res
        .status(400)
        .json({ status: "error", code: 400, message: "Not Found" });
  }
});

router.put("/:contactId", validateBody(joiSchema), async (req, res, next) => {
  try{
    const contact = await ContactsController.updateContact(req.params.contactId,req.body);
    return res.json({ status: "success", code: 200, payload: { contact } });
  }catch(error){
    res
        .status(400)
        .json({ status: "error", code: 400, message: "Not Found" });
  }
});
router.patch("/:contactId/favorite", validateBody(favoriteShcema), async (req, res, next) => {
  try{
    if(!req.body){
     return res.status(400).json({"message": "missing field favorite"})
    }
    const contact = await ContactsController.patchContact(req.params.contactId,req.body);
    return res.json({ status: "success", code: 200, payload: { contact } });
  }catch(error){
    res
        .status(400)
        .json({ status: "error", code: 400, message: "Not Found" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try{
    const contact = await ContactsController.removeContact(req.params.contactId);
    return res.json({ status: "success", code: 200, payload: { contact } });
  }catch(error){
    return res
        .status(404)
        .json({ status: "error", code: 404, message: "Not Found" });
  }
});



module.exports = router;
