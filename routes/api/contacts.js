const express = require("express");
const controllWrapper = require("../../helpers/ctrlWrapper");
const contactsCtrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const schema = require("../../schemas/contacts");

const router = express.Router();

router.get("/", controllWrapper(contactsCtrl.getAll));

router.get("/:contactId", controllWrapper(contactsCtrl.getOneById));

router.post(
    "/",
    validateBody(schema.contactShema),
    controllWrapper(contactsCtrl.add)
);

router.delete("/:contactId", controllWrapper(contactsCtrl.remove));

router.put(
    "/:contactId",
    validateBody(schema.contactShema),
    controllWrapper(contactsCtrl.update)
);

module.exports = router;
