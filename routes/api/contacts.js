const express = require("express");
const {
	listContactsController,
	getContactByIdController,
	removeContactController,
	addContactController,
	updateContactController,
	updateStatusContactController,
} = require("../../controllers/controllers");

const {
	validation,
	validationPUT,
	validationFavorite,
} = require("../../middlewares/validation");

const { asyncWrapper } = require("../../helpers/errWrapper");

const router = express.Router();

router.get("/", asyncWrapper(listContactsController));

router.get("/:contactId", asyncWrapper(getContactByIdController));

router.post("/", validation, asyncWrapper(addContactController));

router.delete("/:contactId", asyncWrapper(removeContactController));

router.put("/:contactId", validationPUT, asyncWrapper(updateContactController));

router.patch(
	"/:contactId/favorite",
	validationFavorite,
	asyncWrapper(updateStatusContactController)
);
module.exports = router;
