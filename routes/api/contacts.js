import contactService from "../../models/contacts.js"
import contactController from "../../controllers/contact-controller.js"
import express from 'express'
import {isEmptyBody} from "../../middlewares/index.js"
const router = express.Router()


router.get('/', contactController.getAllContacts) // визиваємо контроллер 

router.get('/:contactId', contactController.getByID)

router.post('/', isEmptyBody, contactController.addNewContact)
// isEmptyBody- функція обробник, яка провіряє чи пустий масив даних які відпрвив користувач



router.delete('/:contactId', contactController.deleteById)

router.put('/:contactId',isEmptyBody, contactController.updateById)

export default router



// Щоб отримати дані, потрібно викликати метод, передати в нього шлях і сколбек:
// app.get('/contact/:id', (req, res) => {
//   res.send(`<h1>Contact</h1> Параметр: ${req.params.id}`);
// });

// Щоб під час кожного виклику не прописувати шляхи існують маршрути, 
// в яких після /( / - це початковий маршрут), додають додаткові дані, для іншого маршруту

// Тобто в маршруті ми пишемо:
// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// А в апп просто лише - 
// const myRouter= require('./my-router');
// app.use('/my-router', myRouter);


