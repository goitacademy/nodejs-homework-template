const express = require('express')
const { contactSchema } = require('../../schemas')
const { controllerWrapper, validation } = require('../../middlewares')
const contactsController = require('../../controllers')
const router = express.Router()

router.get('/', controllerWrapper(contactsController.getContacts))

router.get('/:id', controllerWrapper(contactsController.getContactById))

router.post('/', validation(contactSchema), controllerWrapper(contactsController.addContact))

router.put('/:id', validation(contactSchema), controllerWrapper(contactsController.updateContactsById))

router.delete('/:id', controllerWrapper(contactsController.removeContact))
// router.get('/', async (req, res, next) => {
//   try {
//     const contacts = await contactOperations.listContacts()
//     res.json({
//       status: 'success',
//       code: 200,
//       data: {
//         result: contacts
//       }
//     })
//   } catch (error) {
//     next(error)
//   }
// })

// router.get('/:id', async (req, res, next) => {
//   try {
//     const { id } = req.params
//     const result = await contactOperations.getContactById(id)
//     if (!result) {
//       const error = new Error(`Contact with id=${id} not found`)
//       error.status = 404
//       throw error
//     }
//     res.json({
//       status: 'success',
//       code: 200,
//       data: {
//         result
//       }
//     })
//   } catch (error) {
//     next(error)
//   }
// })

// router.post('/', async (req, res, next) => {
//   try {
//     const { error } = contactSchema.validate(req.body)
//     if (error) {
//       const err = new Error(error.message)
//       err.status = 400
//       throw err
//     }
//     const result = await contactOperations.addContact(req.body)
//     res.status(201).json({
//       status: 'success',
//       code: 201,
//       data: {
//         result
//       }
//     })
//   } catch (error) {
//     next(error)
//   }
// })

// router.delete('/:id', async (req, res, next) => {
//   try {
//     const { id } = req.params
//     const result = await contactOperations.removeContact(id)
//     if (!result) {
//       const error = new Error(`Contact with id=${id} not found`)
//       error.status = 404
//       throw error
//     }
//     res.json({
//       status: 'success',
//       code: 200,
//       message: 'Success delete'
//     })
//   } catch (error) {
//     next(error)
//   }
// })

// router.put('/:id', async (req, res, next) => {
//   try {
//     const { error } = contactSchema.validate(req.body)
//     if (error) {
//       const err = new Error(error.message)
//       err.status = 400
//       throw err
//     }
//     const { id } = req.params
//     const result = await contactOperations.updateContactsById(id, req.body)
//     if (!result) {
//       const error = new Error(`Product with id=${id} not found`)
//       error.status = 404
//       throw error
//     }
//     res.json({
//       status: 'success',
//       code: 200,
//       data: {
//         result
//       }
//     })
//   } catch (error) {
//     next(error)
//   }
// })

module.exports = router
