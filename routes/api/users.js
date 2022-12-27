const express = require('express');

const { ctrlWrappers } = require("../../helpers");

const { validateBody, validateId, auth } = require("../../middlewares");

const ctrlUsers = require('../../controllers/usersControllers');

const schemas = require("../../schemas/users")

const router = express.Router();


router.get('/current', ctrlWrappers(ctrlUsers.getCurrent));

router.patch('/:_id/subscription', validateBody(schemas.SubscriptionSchema), ctrlWrappers(ctrlUsers.update))

module.exports = router