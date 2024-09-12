// const Contacts = require("../../models/contactsSchema");
const removeContactServices=require('../../services/contactServices/removeContactServices')


const removeContact = async (req, res, next) => {
    const {contactId} = req.params;
    console.log('contactId',contactId)
    try {
      const result = await removeContactServices(contactId);
      if (!result) {
       res.status(404).json({
          status: "error",
          code: 404,
          message: `Not found task id: ${id}`,
          data: "Not Found",
       })
      } 
      res.json({
          status: "success",
          code: 200,
          data: {message:"Contact deleted successfully"},
        }); 
        
      
    } catch (e) {
      console.error(e);
      next(e);
    }
  };
  module.exports=removeContact;