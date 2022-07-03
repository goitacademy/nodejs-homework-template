
const express = require('express');

const { checkAuth, validation, ctrlWrapper } = require('../../middlewares');
const { users: ctrl } = require('../../controllers');
const { joiSchemaSubscription, joiSchema } = require('../../models/user');


const router = express.Router();

router.post('/register', validation(joiSchema), ctrl.register);
router.post('/login', validation(joiSchema), ctrlWrapper(ctrl.login));
router.get('/logout', checkAuth, ctrlWrapper(ctrl.logout));
router.get('/current', checkAuth, ctrlWrapper(ctrl.getCurrentUser));
router.patch(
    "/",
    checkAuth,
    validation(joiSchemaSubscription),
    ctrlWrapper(ctrl.updateSubscription)
);
router.patch("/avatars", checkAuth, ctrlWrapper(ctrl.changeAvatar)
);

module.exports = router;