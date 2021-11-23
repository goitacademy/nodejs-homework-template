const express = require('express')
const router = express.Router()
const {listContacts, getContactById, removeContact, addContact, updateContact } = require("../../model/index");

const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),

})

router.get("/", async (req, res, next)=> {
  try{
    const contactList = await listContacts();
    res.json({
        status: "success",
        code: 200,
        data: {
          result: contactList
        }
    })
  } catch(error){
    next(error);
  }
});

router.get("/:contactId",  async (req, res, next) => {
  try{
    const {contactId} = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Product with id=${contactId} not found`
    })
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: result
      }
  })
  }catch(error){
    next(error);
  }
})


router.post("/", async (req, res, next)=> {
  try {
    const {error} = contactSchema.validate(req.body);
    if(error){
      res.status(400).json({
            status: "error",
            code: 400,
            "message": "missing required name field"
    })}
  const result =  await addContact(req.body);
  res.status(201).json({
      status: "success",
      code: 201,
      data: {
          result: result
      }
  })
} catch(error){
    next(error);
  }
});


router.delete('/:contactId', async (req, res, next) => {
const {contactId} = req.params;
const result = await removeContact(contactId);
if (!result) {
  res.status(404).json({
    status: "error",
    code: 404,
    message: `Product with id=${contactId} not found`
})
}
res.json({
  status: "success",
  code: 200,
  message: "contact deleted",
  data:{
    result: result
  }
})
})



router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = contactSchema.validate(req.body);
    if(error){
      res.status(400).json({
            status: "error",
            code: 400,
            "message": "missing fields"
    })
  }
  const {contactId} = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) {
    res.status(404).json({
      status: "error",
      code: 404,
      "message": "Not found"
  })
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact updated",
    data:{
      result: result
    }
  })
} catch (error) {
  next(error);
}
})



module.exports = router
