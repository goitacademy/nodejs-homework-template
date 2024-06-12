const {Contact} = require("../../models")
const createError = require('http-errors');

const getContactById= async (req, res) => {
    const {contactId}=req.params;
    const result= await Contact.findById(contactId);
   
    if(!result){
      throw createError(404,`Product  with id ${contactId} not found`)
    }
      res.json({ status:"success",
      code:200,
      data:{
      result:result
    }
       }) ;
  
  }

  module.exports=getContactById