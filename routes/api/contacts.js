const express = require("express");
const {Contact} = require('../../controllers');
const { validateBody, validateID } = require('../../middleware');
const { addSchema, patchSchema } = require('../../schemas');
const router = express.Router();


router.get("/", Contact.getAll);

router.get("/:contactId", validateID, Contact.getById);

router.post("/", validateBody(addSchema), Contact.add);

router.delete("/:contactId", validateID, Contact.remove);

router.put("/:contactId", validateID, validateBody(addSchema), Contact.update);

router.patch("/:contactId/favorite", validateID, validateBody(patchSchema), Contact.updateStatus);

module.exports = router;
