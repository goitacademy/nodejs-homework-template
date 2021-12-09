const {
    listContacts,
  } = require("../../model/contacts/index")


const getAll = async (req, res, next) => {
    try { 
      const contacts = await listContacts()
     res.json({
       status: "success",
       code: 200,
       data: {
         contacts
       }
     })
    
    } catch (error) {
      next(error)
    }
   }

   module.exports = getAll;