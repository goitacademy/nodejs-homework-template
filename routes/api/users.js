const express = require('express')
const {users: ctrl} = require('../../src/controllers')
const {validation, auth} = require('../../src/middlewares')
const {updateContactStatusJoiSchema} = require('../../models/contactSchema')
const upload = require('../../src/middlewares/upload')
const fs = require('fs/promises')
const path = require('path')


const router = express.Router()

router.get('/current', auth, ctrl.getCurrent)

router.get('/all', auth, ctrl.getUsers)

router.patch('/avatars', auth, upload.single('image'), (req, res) => {
  const { path: tempUpload, originalname} = req.file
 
  const avatarDir = '/Volumes/Storage/nodejs-homework-rest-api/public/avatars'
  const resultUpload = path.join(avatarDir, originalname)
  console.log(tempUpload)
  console.log(resultUpload)
})

router.patch('/', auth, validation(updateContactStatusJoiSchema), ctrl.updateSubscription)

module.exports = router
