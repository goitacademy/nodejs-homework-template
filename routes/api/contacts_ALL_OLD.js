const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { NotFound } = require('http-errors')
const Joi = require('joi')

const contactsOperations = require("../../models/contacts")

const { lineBreak } = require("../../service");


//-----------------------------------------------------------------------------
//* ++++++++++++++++++++++ Схемы ВАЛИДАЦИИ Joi +++++++++++++++++++++++++
const contactSchemaPostPut = Joi.object({
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

//--------------------------------------------------------------------
const contactSchemaPutch = Joi.object({
  name: Joi.string()
    // .alphanum()
    .min(3)
    .max(30)
    .optional(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua', 'org',] } })
    .optional(),

  phone: Joi.string()
    // .alphanum()
    .min(5)
    .max(14)
    .optional(),
});
//* _______________________ Схемы ВАЛИДАЦИИ Joi _______________________



//-----------------------------------------------------------------------------
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



//-----------------------------------------------------------------------------
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



//-----------------------------------------------------------------------------
//! 3. Создание НОВОГО ПОЛЬЗОВАТЕЛЯ
router.post("/", async (req, res, next) => {
  try {
    //! ===========================console============================
    console.log("START-->POST".yellow); //!
    lineBreak();
    //! ==============================================================

    //* +++++++++++++++++++++++ ВАЛИДАЦИЯ Joi +++++++++++++++++++++++++++++
    const validationResult = contactSchemaPostPut.validate(req.body);

    if (validationResult.error) {
      //! ===========================console============================
      console.log("Ошибка ВАЛИДАЦИИ:".bgRed.black);
      console.log("");
      console.log(validationResult.error);
      lineBreak();
      console.log("END-->POST".yellow); //!
      //! ==============================================================
      //! 1 - вариант
      // return res.status(400).json({ "message": "missing required name field" });
      //! 2 - вариант
      // validationResult.error.status = 400
      // throw validationResult.error
      //! 3 - вариант
      return res.status(400).json({ status: validationResult.error.details });
    }
    //* __________________________ ВАЛИДАЦИЯ Joi __________________________

    const contact = await contactsOperations.addContact(req.body)

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: contact
      }
    });

  } catch (e) {
    next(e);
    // res.status(500).json({ error: e.message });
  }
});



//-----------------------------------------------------------------------------
//! 4-1. PUT-Обновление ОДНОГО КОНТАКТА по id
router.put('/:contactId', async (req, res, next) => {
  try {
    //! ===========================console============================
    console.log("START-->PUT/:id".rainbow); //!
    lineBreak();
    //! ==============================================================

    //* +++++++++++++++++++++++ ВАЛИДАЦИЯ Joi +++++++++++++++++++++++++++++
    const validationResult = contactSchemaPostPut.validate(req.body);

    if (validationResult.error) {
      //! ===========================console============================
      console.log("Ошибка ВАЛИДАЦИИ:".bgRed.black);
      console.log("");
      console.log(validationResult.error);
      lineBreak();
      console.log("END-->PUT/:id".rainbow); //!
      //! ==============================================================
      //! 1 - вариант
      // return res.status(400).json({ "message": "missing required name field" });
      //! 2 - вариант
      // validationResult.error.status = 400
      // throw validationResult.error
      //! 3 - вариант
      return res.status(400).json({ status: validationResult.error.details });
    }
    //* __________________________ ВАЛИДАЦИЯ Joi __________________________

    const { contactId } = req.params;
    const contact = await contactsOperations.updatePutContact(contactId, req.body)

    if (!contact) {
      //! 4 - вариант
      throw new NotFound(`Contact wiht id:'${contactId}' not found`)
    }

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result: contact
      }
    })

  } catch (e) {
    next(e);
    // res.status(500).json({ error: e.message });
  }
});



//-----------------------------------------------------------------------------
//! 4-2. PATCH-Обновление ОДНОГО КОНТАКТА по id
router.patch("/:contactId", async (req, res, next) => {
  try {
    //! ===========================console============================
    console.log("START-->PATCH/:id".rainbow); //!
    lineBreak();
    //! ==============================================================

    //* +++++++++++++++++++++++ ВАЛИДАЦИЯ Joi +++++++++++++++++++++++++++++
    const validationResult = contactSchemaPutch.validate(req.body);

    if (validationResult.error) {
      //! ===========================console============================
      console.log("Ошибка ВАЛИДАЦИИ:".bgRed.black);
      console.log("");
      console.log(validationResult.error);
      lineBreak();
      console.log("END-->PATCH/:id".rainbow); //!
      //! ==============================================================
      //! 1 - вариант
      // return res.status(400).json({ "message": "missing required name field" });
      //! 2 - вариант
      // validationResult.error.status = 400
      // throw validationResult.error
      //! 3 - вариант
      return res.status(400).json({ status: validationResult.error.details });
    }
    //* __________________________ ВАЛИДАЦИЯ Joi __________________________

    const { contactId } = req.params;
    const contact = await contactsOperations.updatePatchContact(contactId, req.body)

    if (!contact) {
      //! 4 - вариант
      throw new NotFound(`Contact wiht id:'${contactId}' not found`)
    }

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result: contact
      }
    })

  } catch (e) {
    next(e);
    // res.status(500).json({ error: e.message });
  }
});



//-----------------------------------------------------------------------------
//! 5. Удаление ОДНОГО КОНТАКТА по id
router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.removeContact(contactId)

    if (!contact) {
      //! 4 - вариант
      throw new NotFound(`Contact wiht id:'${contactId}' not found`)
    }

    res.status(200).json({
      status: "success",
      code: 204,
      message: `User wiht id:'${contactId}'was remove:`,
      data: {
        result: contact
      }
    });

  } catch (e) {
    next(e);
    // res.status(500).json({ error: e.message });
  }
});



//-----------------------------------------------------------------------------
//! 6. Удаление ВСЕХ КОНТАКТОВ
router.delete("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.removeAllContacts()

    res.status(200).json({
      status: "success",
      code: 204,
      message: "ALL Users were remove...",
      data: {
        result: contacts
      }
    });

  } catch (e) {
    next(e);
    // res.status(500).json({ error: e.message });
  }
});


module.exports = router
