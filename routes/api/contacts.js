const express = require('express')
const router = express.Router()

const { validation, ctrlWrapper } = require("../../middleWares")
const { contactSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");

const validateMiddleware = validation(contactSchema);

router.get("/", ctrlWrapper(ctrl.getAll));

// знайти контакт по id===============================================================================================================
router.get('/:contactId', ctrlWrapper(ctrl.getById) )

// Додавання контакта=========================================================================
router.post('/', validateMiddleware, ctrlWrapper(ctrl.addContact))

// оновлення контакта по id================================================================
router.put('/:contactId', validateMiddleware, ctrlWrapper(ctrl.updateContactById))

// видалення контакту============================================================================
router.delete('/:contactId', ctrlWrapper(ctrl.removeContactById)); 

module.exports = router;

// // Comments 2
// const express = require('express')
// const router = express.Router()

// // імпортуємо middleware для валідації та ctrlWrapper
// const { validation, ctrlWrapper } = require("../../middleWares")
// // імпортуємо схему валідації
// const { contactSchema } = require("../../schemas");
// // імпортуємо contacts (об'єкт функцій-контроллерів) із controllers і переіменовуємо його в ctrl
// const { contacts: ctrl } = require("../../controllers");

// // створюємо ф-ю валідації
// const validateMiddleware = validation(contactSchema);
// // тобто по факту буде відбуватись: contactSchema.validate(req.body);

// // і тепер в роутах передаємо потрібну ф-ю-контроллер
// // тобто ідея в тому, щоб винести функції-контроллери для запитів в окрему папку - controllers, а суди їх передати другим
// // аргументом після маршруту

// // ctrlWrapper - ф-я(middleware), в якій виконується блок try-cath. Спочатку запит виконується саме чере цю middleware
// router.get("/", ctrlWrapper(ctrl.getAll));

// // знайти контакт по id===============================================================================================================
// router.get('/:contactId', ctrlWrapper(ctrl.getById) )

// // Додавання контакта=========================================================================
// // при додаванні контакту спочатку запит пройде через validateMiddleware, і якщо не буде помилки, то виконається далі ф-я-контроллер
// //  ctrl.addContact. Якщо ж помилка буде, то далі запит просто не піде
// // таким чином, ми полегшуємо код, і всередині контроллера не проводимо валідація, а просто створюємо мідлвару,
// // яку цю валідацію робить, і відповідно ставимо її між маршрутом запиту та контроллером
// router.post('/', validateMiddleware, ctrlWrapper(ctrl.addContact))

// // оновлення контакта по id================================================================
// router.put('/:contactId', validateMiddleware, ctrlWrapper(ctrl.updateContactById))


// // видалення контакту============================================================================
// router.delete('/:contactId', ctrlWrapper(ctrl.removeContactById)); 

// module.exports = router;


// COMMENTS - 1
// // express - бібліотека для створення серверу
// const express = require('express')
// // // створюємо певну сторінку з різними запитами (зберігаючи основний сервер)
// // // створення роутеру дозволяє нам не записувати логіку наших обробників(запитів на сервер) безпосередньо у файлі створення сервера
// const router = express.Router()
// // імпортуємо бібліотеку joi для валідації (щоб під час post або put контролювати введену інфу) 
// const Joi = require("joi");


// // Створюємо схему для валідації: описуємо, які поля будуть в об'єкті і які вимоги будуть до кожного поля
// const contactSchema = Joi.object({
//   name: Joi.string().required(),
//   phone: Joi.required(),
//   email: Joi.string().email().required()
// })

// const contactsOperations = require("../../models/contacts");



// // прописуємо інструкції для сервера
// // 1--------------отримати список контактів=================================================================================
// // де req - запит, який відправляємо на сервер
// //  res - відповідь від сервера
// router.get("/", async (req, res, next) => {
//   try {
//     const contacts = await contactsOperations.getAll();
//     res.json({
//       status: "success",
//       code: 200,
//       data: {
//         result: contacts,
//       }
//     });
//   } catch (error) {
//      // щоб кожного разу не дублювати код - ми просто записуємо next(error), який у випадку помилки перейде до файлу app.js, 
// // а сaме до middleware, яка має 4 параметри- app.use((err, req, res, next) - і виконається її код  
//     next(error);
//     // або ж замість next(error) постійно дублювати код в кожному запиті, що не дуже логічно
//     // res.status(500).json({
//     //   status: "error",
//     //   code: 500,
//     //   message: "Server error"
//     // })
//   }
// });


// // знайти контакт по id===============================================================================================================
// router.get('/:contactId', async (req, res, next) => {
//   try {
//     // динамічні ключі завжди знаходяться в req.params
//     const { contactId } = req.params;
//     const result = await contactsOperations.getById(contactId);
//     // якщо під час запиту вказати неіснуючий id, то також отримаємо успішний результат запиту, але отримаємо data: null,
//     // що є не зовсім вірно, оскільки це також вважається помилкою, тому опрацьовуємо це так:
//     if (!result) {
//     //  під час кожної помилки ми хочему обробляти її за допомогою 1ї maddleware, яка знаходиться в app.js, але код помилок різний,
//     // тому робимо так:
//       // створюємо помилку, яка автоматично направиться до блоку catch(error) і далі вже на обробку до app.js
//       // + потрібно змінити статус даної помилки, оскільки у middleware по дефолту вказаний статус 500
//       // зписуємо message для error
//       const error = new Error(`Contact with id=${contactId} not found`);
//       // присвоюємо помилці статус
//       error.status = 404;
//       // викидаємо помилку
//       throw error;

//       // res.status(404).json({
//       //   status: "error",
//       //   code: 404,
//       //   message: `Contact with id=${contactId} not found`
//       // });
//       // return;
//     }

//     res.json({
//       status: "success",
//       code: 200,
//       data: {result},
//     })

//   } catch (error) {
//     next(error);
//   }
// })

// // Додавання контакта=========================================================================
// router.post('/', async (req, res, next) => {
//   try {
//     // проводимо валідацію req.body та беремо з неї значення поля error (якщо валідація пройшла успішно, то error = false)
//     const { error } = contactSchema.validate(req.body);
//     // якщо помилка валідації існує, то прокидуємо помилку
//     if (error) {
//       error.status = 400;
//       throw error;
//     }
//     // req.body - буде об'єктом, оскільки цей код пройде чере middleware (app.use(express.json())), яка знаходиться в app.js 
//     const result = await contactsOperations.addContact(req.body);
//     // якщо додавання пройшло успішно - то відправляємо статус 201 - "успішно додано щось нове"
//     res.status(201).json({
//     status: "success",
//       code: 201,
//       data: {result},
//     })
//   } catch (error) {
//     next(error);
//   }
// })

// // оновлення контакта по id================================================================
// router.put('/:contactId', async (req, res, next) => {
//   try {
//     const { error } = contactSchema.validate(req.body);
//     if (error) {
//       error.status = 400;
//       throw error;
//     }

//     const { contactId } = req.params;
//     const result = await contactsOperations.updateContactById(contactId, req.body);
//     if (!result) {
//       const error = new Error(`Contact with id=${contactId} not found`);
//       error.status = 404;
//       throw error;
//     }
    
//     res.status(201).json({
//     status: "success",
//       code: 201,
//       data: {result},
//     })
//   } catch (error) {
//     next(error);
//   }
// })


// // видалення контакту============================================================================
// router.delete('/:contactId', async (req, res, next) => {
//   try {
//     // дістаємо contactId із req.params
//     const { contactId } = req.params;
//     const result = await contactsOperations.removeContactById(contactId);
//     if (!result) {
//       const error = new Error(`Contact with id=${contactId} not found`);
//       error.status = 404;
//       throw error;
//     }
//     res.json({
//       status: "success",
//       code: 200,
//       message: "contact deleted",
//       data: {result}
//     });
//   }
//   catch (error) {
//     next(error);
//   }
// }) 



// // експортуємо сторінку до файлу, де створено сервер - app.js
// module.exports = router;




