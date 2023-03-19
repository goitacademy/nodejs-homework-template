const service = require("../../service/index")

export const deletedContact = async (req, res) => {
   const { contactId } = req.params;
  try {
    const contacts = await service.removeContact(contactId)
    contacts ?  
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