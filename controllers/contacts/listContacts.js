
const Contact = require("../../models/contactSchema.js");

const listContacts = async (req, res, next) => {
  
     const data = await Contact.find(); 
     if (!data) {
       const error = requestError();
       throw error;
     }
 
     return res.json({
       status: "ok",
       code: 200,
       data,
     });
  }

  module.exports = listContacts;