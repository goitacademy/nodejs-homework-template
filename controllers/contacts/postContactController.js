const { BadRequest } = require('http-errors')
const {joySchema} = require('../../model/contact')

const {Contact}= require('../../model')


const postContactController = async (req, res, next) => {
  try {
    const { error } =
      joySchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const newContact = await Contact.create(req.body)
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

module.exports = postContactController