const Contact = require("../../models/contactSchema.js");


const removeContact = async (req, res, next) => {
    
      const { contactId } = req.params;
  
      const isRemoved = await Contact.findByIdAndRemove(contactId);
  
      if (isRemoved) {
        res.json({
          status: "success",
          code: 200,
          message: "contact deleted",
        });
      }
   
  }

module.exports = removeContact;