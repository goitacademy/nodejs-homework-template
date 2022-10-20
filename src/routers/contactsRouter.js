const express = require("express");
const router = express.Router();

const {
    listContactsController,
    getContactByIdController,
    removeContactController,
    addContactController,
    updateContactController,
    updateStatusContactController,
} = require("../controllers/contactsController");

const {
    validateObjectId,
    addContactValidation,
    updateContactValidation,
    removeContactValidation,
    updateStatusContactValidation,
} = require("../midlewares/validationMidleware");

const { asyncWrapper } = require("../helpers/apiHelpers");

router.get("/", asyncWrapper(listContactsController));

router.get("/:id", validateObjectId, asyncWrapper(getContactByIdController));

router.post("/", addContactValidation, asyncWrapper(addContactController));

router.delete(
    "/:id",
    removeContactValidation,
    asyncWrapper(removeContactController)
);

router.put(
    "/:id",
    updateContactValidation,
    asyncWrapper(updateContactController)
);

router.patch(
    "/:id/favorite",
    updateStatusContactValidation,
    asyncWrapper(updateStatusContactController)
);
