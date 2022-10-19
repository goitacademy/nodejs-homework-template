const {schemas, Contact} = require('../models/contact')

const add = () => async (req, res, next) => {
    const isValid = schemas.validateSchema.validate(req.body)
    if(isValid.error){
      res.status(403).json({message: isValid.error.details[0].message})
    }
    // if(!req.body.name || !req.body.phone || !req.body.email){
    //   res.status(400).json({message: "missing required name field"})
    // }
    const result = await Contact.create(req.body)
    res.status(201).json(result) 
  }

module.exports = add