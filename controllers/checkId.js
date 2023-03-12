const { getContactById } = require("../models/contacts")

const checkId = async (req, res, next) => {
    try {
      const { id } = req.params
      const contact = await getContactById(`${id}`)
     
        res.status(200).json({ contact })
        return contact
      
    } catch (error) {
      console.log('error: ', error);
    }
  }

module.exports = checkId