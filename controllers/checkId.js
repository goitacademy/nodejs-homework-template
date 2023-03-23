const { getContactById } = require("../models/contacts")

const checkId = async (req, res, next) => {
    try {
      const { id } = req.params
      const contact = await getContactById(`${id}`)
      if (contact) {
        res.status(200).json({ contact })
        return contact
      }
      
     
        
      
    } catch (error) {
      
    }
  }

module.exports = checkId