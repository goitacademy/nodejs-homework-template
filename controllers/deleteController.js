const {
    removeContact
} = require("../models/contacts")

exports.deleteContact = async (req, res) => {
   const { contactId } = req.params;
  try {
    const contacts = await removeContact(contactId)
    contacts.filter(contact => contact.id !== contactId) ?  
      res.json({
        message: "contact deleted"
      })
      : res.json({
        code: 404,
        message: "Not Found"
      })
    
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error"
    })
  } 
}