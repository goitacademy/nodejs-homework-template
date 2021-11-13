const { BadRequest, NotFound } = require('http-errors')
const {Contact} = require('../../model')

const updateFavoriteController = async (req, res, next) => {
  try {
    console.log(req.params);
    const favorite = req.body
    const { contactId } = req.params
    
    if (!favorite) {
      throw new NotFound({"message": "missing field favorite"})
    }
    const newContact = await Contact.findByIdAndUpdate(contactId, favorite, {new: true})
    if (!newContact) {
      throw new error({"message": "missing field favorite"})
    }
      res.status(201).json({
     status: 'success',
     code: 201,
     data: {
       newContact
       
     }
   })
  } catch (error) {
    next(error)
    
  }
}

module.exports = updateFavoriteController