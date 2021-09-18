const express = require('express')

const { joiSchema } = require('../../models/contact')
const { validation, controllerWrapper, upload } = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')

const router = express.Router()

// const validationMiddleware = controllerWrapper(validation(joiSchema));

router.get('/', controllerWrapper(ctrl.getAll))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.add))
/* upload.single('avatarURL') зчитує з запиту  поля 'avatarURL' зображення
 * і зберігає в папку temp;   upload.single('avatarURL') - вказати 
 * в upload.js в middlewares щоб не перебирати всі поля, в ін.разі
 * upload.fields([]). Upload.js передає до controllers, який вирішує що робити */
router.patch('/:id', upload.single('avatarURL'), controllerWrapper(ctrl.updateImg)) 

module.exports = router
