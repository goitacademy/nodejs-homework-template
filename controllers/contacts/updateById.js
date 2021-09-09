// const {productSchema} = require("../../models/product");
const { Contact } = require('../../models')

const updateById = async (req, res, next) => {
  try {
    // const {error} = contactSchema.validate(req.body);
    // if(error){
    //     return res.status(400).json({
    //         message: error.message
    //     })
    // }
    const { contactId } = req.params
    const updateContact = await Contact.findByIdAndUpdate(contactId, req.body)
    if (!updateContact) {
      return res.status(404).json({
        message: 'Not found'
      })
    }
    res.json({
      updateContact
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateById
