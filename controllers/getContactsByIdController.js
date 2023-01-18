const {getContactById} = require('../models/contacts')

const getContactByIdControllers = async (req, res) => { 
  try {
    const contact = await getContactById(req.params.contactId)
    if (contact) { 
      return res.status(200).json({contact})
    }
    return res.status(404).json({message: "id Not Found"})
  } catch (error) {
    console.log(message.error);
  }
}

module.exports = {getContactByIdControllers}