const express = require('express')
const Joi = require('joi');//библиотека для проверки и валидации входных данных (например при добоавлении нового контакта чтобы был номер и имя, а не только имя)
const contacts= require("../../models/contacts")
const router = express.Router() //Этот объект позволяет группировать обработчики маршрутов, связанные с определенными путями URL то есть создает страничку записной книжки, а не новую книжку 


const {HttpError} = require("../../helpers/index")

const addSchema = Joi.object({
  name: Joi.string().required(),
  email:Joi.string().required(),
  phone:Joi.string().required(),
})





router.get('/', async (req, res, next) => {
try {
  const result = await contacts.listContacts()
  res.json(result)
  // console.table(result)
} catch (error) {
next(error) //Express ищет не простo следующий обработчик, а именнo обработчик ошибок. В нашем случае это хранщаяся в файле app.js последняя middleware  
} })

router.get('/:contactId', async (req, res, next) => {
  try {
const {id} = req.params;
console.log(req.params)
const result = await contacts.getContactById(id)
if(!result){
  throw HttpError(404,"Not Found");
}

res.json(result)

  } catch (error) {
    next(error) 
  }
})

router.post('/', async (req, res, next) => {
  try {

const {error} = addSchema.validate(req.body) //проверяем на соответствие требованиям, указанным в схеме
console.log("error:", error)

if(error){ // если по схеме ошибка в получаемых данных, то выбрасываем ошибку
  throw HttpError(404,error.message)
}
    // console.log(req.body)
    const result = await contacts.addContact(req.body)
    res.status(200).json(result)
  } catch (error) {
    next(error)  
  }
})




router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params
    const result = await contacts.deleteContact(contactId)
    console.log(result)
    if(!result){ //если результат null 
      throw HttpError(404,"Not Found");
    }
    res.json({
      message: "Delete success"
    })
    console.table('result', result); 
  } catch (error) {
    next(error)  

  }

 
})


// PUT запрос всегда все обновляет => если мы что-то меняем, то перезаписываем полностью наше элемент и вводим все поля, и те которые изменились, и те которые нет
router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body) 
    console.log("req.params:", req.params)
    console.log("error:", error)
    if(error){ 
      throw HttpError(400,error.message)
    }
        const {contactId} = req.params
        const result = await contacts.updateContact(contactId, req.body)
        if(!result){ //если результат null т.е. нет книги стаким id
          throw HttpError(404,"Not Found");
        }
        res.json(result)
        console.log('result', result); 
        } catch (error) {
          next(error)  
  }
})

module.exports = router
