const express = require('express');
const { contacts: ctrl } = require('../../controllers');
const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");

const router = express.Router()

router.get('/',
    auth(["ADMIN", "MODERATOR", "CUSTOMER", "EDITOR", "GUEST"]),
    ctrlWrapper(ctrl.getAllContacts)
);

router.get("/:contactId",
    auth(["ADMIN", "MODERATOR", "CUSTOMER", "EDITOR", "GUEST"]),
    ctrlWrapper(ctrl.getContactById)
);

router.post('/',
    auth(["ADMIN", "MODERATOR", "CUSTOMER", "EDITOR", "GUEST"]),
    validation(joiSchema),
    ctrlWrapper(ctrl.addContact)
);

router.delete('/:contactId',
    auth(["ADMIN", "MODERATOR", "CUSTOMER", "EDITOR", "GUEST"]),
    ctrlWrapper(ctrl.deleteContact)
);

router.put('/:contactId',
    auth(["ADMIN", "MODERATOR", "CUSTOMER", "EDITOR"]),
    validation(joiSchema),
    ctrlWrapper(ctrl.updateContact)
);

router.patch('/:contactId/favorite',
    auth(["ADMIN", "MODERATOR", "CUSTOMER", "EDITOR"]),
    validation(favoriteJoiSchema),
    ctrlWrapper(ctrl.updateContactFavorite)
);

module.exports = router;
