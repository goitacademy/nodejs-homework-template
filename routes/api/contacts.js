const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { NotFound } = require('http-errors')
const Joi = require('joi')

const contactsOperations = require("../../models/contacts")


//------------------------------------------------------------
//! 1. Получение списка ВСЕХ КОНТАКТОВ
router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result: contacts
      }
    })

  } catch (e) {
    next(e)
    // res.status(500).json({ error: e.message })
  }
})


//------------------------------------------------------------
//! 2. Получение ОДНОГО КОНТАКТА по id
router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId)

    if (!contact) {
      //! 4 - вариант
      throw new NotFound(`Contact wiht id:'${contactId}' not found`)
      //! 3 - вариант
      // throw createError(404, `Contact wiht id:'${contactId}' not found`)
      //! 2 - вариант
      // const error = new Error(`Contact wiht id:'${contactId}' not found`)
      // error.status = 404
      // throw error
      //! 1 - вариант
      //   res.status(404).json({
      //   status: "error",
      //   code: 404,
      //   message: `Contact wiht id:'${contactId}' not found`
      // })
      // return
    }

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result: contact
      }
    })

  } catch (e) {
    next(e)
    // res.status(500).json({ error: e.message })
  }
})

//------------------------------------------------------------
// //? 3. Создание НОВОГО КОНТАКТА
// router.post('/', async (req, res, next) => {
//   const contact = await contactsOperations.addContact()
//   res.json({ message: 'template message' })
// })



//! 3. Создание НОВОГО ПОЛЬЗОВАТЕЛЯ
router.post("/", async (req, res, next) => {
  try {

    const contact = await contactsOperations.addContact(req.body)

    console.log("START-->POST".yellow); //!
    lineBreak();
    //! ++++++++++++++ ВАЛИДАЦИЯ Joi +++++++++++++++++++++++++
    const schema = Joi.object({
      name: Joi.string()
        // .alphanum()
        .min(3)
        .max(30)
        .required(),

      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua', 'org',] } })
        .required(),

      phone: Joi.string()
        // .alphanum()
        .min(5)
        .max(14)
        .required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      console.log("Ошибка ВАЛИДАЦИИ:".bgRed.black);
      console.log("");
      console.log(validationResult.error);
      lineBreak();
      console.log("END-->POST".yellow); //!
      return res.status(400).json({ status: validationResult.error.details });
    }
    //! ___________________ ВАЛИДАЦИЯ Joi ___________________

    // const body = req.body; //! в index1.js ==> app.use(express.json());
    // const { name, email, phone } = body;
    // console.log("Эти поля прошли ВАЛИДАЦИЮ:".bgYellow.black);
    // console.log("");
    // console.log("name:".bgYellow.black, name.yellow); //!
    // console.log("email:".bgYellow.black, email.yellow); //!
    // console.log("phone:".bgYellow.black, phone.yellow); //!
    // lineBreak();

    const users = await getUsersList();
    const user = { id: randomUUID().slice(-12), ...body };
    console.log(`НОВЫЙ ПОЛЬЗОВАТЕЛЬ с ID: ${user.id}:`.bgYellow.blue); //!
    console.table([user]); //!

    users.push(user);
    await writeUsers(users);
    // console.log("users_ПОСЛЕ:", users); //!

    console.log("END-->POST".yellow); //!

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: user
      }
    });

  } catch (e) {
    next(e);
    // res.status(500).json({ error: e.message });
  }
});








router.delete('/:contactId', async (req, res, next) => {
  const contact = await contactsOperations.removeContact()
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  const contact = await contactsOperations.updateContact()
  res.json({ message: 'template message' })
})


module.exports = router
