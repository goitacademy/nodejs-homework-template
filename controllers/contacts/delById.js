const {Contact} = require('../../models/contact')
const {RequestError} = require('../../helpers')

const delById = async (req, res, next) => {
 try {
   const { contactId } = req.params;
   const result = await Contact.findByIdAndDelete(contactId)
   
    if (!result) {
      throw RequestError('Not found', 404)
    }
    res.json({message: "contact deleted"})
  }
  catch (error) {
    next(error)
  }
}

module.exports = delById
