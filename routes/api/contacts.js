const express = require("express");
const router = express.Router(); // создаем страницу записной книжки
const contactsOperations = require("../../model/contactsOperations.js");
const {validationSchema} = require("../../validation");


// Получаем список контактов
router.get("/", async (req, res, next) => {
  try {
    const allContacts = await contactsOperations.listContacts();
    res.json(allContacts);
  } catch (error) {
    next(error)   // обработка ошибки будет в арр.js - app.use
    // res.status(500).json({
    //   message: "Server error",
    // });
  }
});

// Поиск контакта по ИД
router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params; // в params содержится переменная id
  console.log("id", contactId);
  try {
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      const error = new Error("Not Found");
      error.status = 404;
      throw error;
    }
    res.json(contact);
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   message: "Server Error",
    // });
  }
});


// Добавление в список контактов

router.post("/", async (req,res,next) => {
  try {
    const {error} = validationSchema.validate(req.body);
    if(error){
      res.status(400).json({message: "missing required name field"});
      throw error;
    }
    const newContact = await contactsOperations.addContact(req.body)
    res.status(201).json(newContact); 
   // console.log("req.body", req.body)  // req.body показывает объект для записи 
  } catch (error) {
    next(error);
  }}
)

// Обновление контакта 

router.put("/:contactId", async(req, res, next) => {
  try {
    const {error} = validationSchema.validate(req.body);
    if(error){
      res.status(400).json({message: "missing required name field"});
      throw error;}

      const {contactId} = req.params;
      // console.log("req.params", req.params);
      // console.log("req.body", req.body);
      const updateContact = await contactsOperations.updateContact(contactId, req.body);

      if (!updateContact) {
        const error = new Error("Not Found");
        error.status = 404;
        throw error;}
        res.json(updateContact);

  } catch (error) {
    next(error);
  }}
)

router.delete("/:contactId", async(req, res, next) => {
  try {
    const {contactId} = req.params;

    const contactToBeDeleted = await contactsOperations.getContactById(contactId);
    if(!contactToBeDeleted){
      const error = new Error("Contact has not been Found");
      error.status = 404;
      throw error;
    }
    
    await contactsOperations.removeContact(contactId);
     res.json({message: "contact deleted"})

  } catch (error) {
    next(error);
  }
});

module.exports = router;