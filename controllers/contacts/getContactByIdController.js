const {Contact} = require('../../model')
const { NotFound} = require('http-errors')

const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await Contact.findById(contactId)
    if (!contactById) {
      throw new NotFound("Not found")
    }
    res.json({
      status: 'success',
      code: 200,
      data: {contactById}
    })
  } catch (error) {
    next(error)
  }
}

module.exports= getContactByIdController