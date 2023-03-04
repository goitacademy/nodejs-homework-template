const { Router } = require('express');

const { updateSubscriptionJoiSchema } = require('../../models');
const { controllerWrapper, auth, validation } = require('../../middlewares');

const {
  usersControllers: { getCurrent, updateSubscription },
} = require('../../controllers');

const router = Router();

router.patch(
  '/',
  auth,
  validation(updateSubscriptionJoiSchema),
  controllerWrapper(updateSubscription)
);

router.get('/current', auth, controllerWrapper(getCurrent));

module.exports = router;
