const express = require("express");
const { asyncMiddlewareWrapper } = require("@root/helpers");
const contactsActions = require("@root/controllers");

const router = express.Router();

router.get("/", asyncMiddlewareWrapper(contactsActions.getAllContacts));

router.get(
  "/:contactId",
  asyncMiddlewareWrapper(contactsActions.getContactByID)
);

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete(
  "/:contactId",
  asyncMiddlewareWrapper(contactsActions.deleteContactByID)
);

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
