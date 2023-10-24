const contactsOperation=require("../../models/contacts");
const createError = require('http-errors');



const updateContactById = async (req, res) => {
    const {contactId}=req.params;
    const {name,email,phone}=req.body;
    const result =await contactsOperation.updateContact(contactId,name,email,phone)
      if(!result){
        throw createError(404,`Product  with id ${contactId} not found`)
      }
      res.json({
        status:"success",
        code:200,
        data:{
           result
           }   
           });
    
  }

  module.exports=updateContactById