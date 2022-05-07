const {schemaJoi,Contact}=require('../../models/contact')

const add = async (req, res, next) => {
  try {
    const {error}=schemaJoi.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: error.message,
      })
    }
    const result=await Contact.create(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

module.exports=add