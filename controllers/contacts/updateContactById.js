const {Contact} = require("../../models")
const createError = require('http-errors');



const updateContactById = async (req, res) => {
    const {contactId}=req.params;
    const result =await Contact.findByIdAndUpdate(contactId,req.body,{new:true})
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