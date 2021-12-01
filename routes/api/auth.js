const express = require('express')

const {
  validation400,
  controllerWrapper,
  authenticate,
  upload,
} = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')
const { joiSchema } = require('../../model/user')

const router = express.Router()

router.post(
  '/register',
  validation400(joiSchema),
  controllerWrapper(ctrl.register)
)

router.post('/login', validation400(joiSchema), controllerWrapper(ctrl.login))

router.get('/logout', authenticate, controllerWrapper(ctrl.logout))

router.patch(
  '/avatars',
  upload.single('avatar'),
  authenticate,
  controllerWrapper(ctrl.updateAvatars)
)

module.exports = router
