const {Contact, schemas} = require('../../models/contact');
const {createError} = require('../../helpers');


const add=async (req, res) => {
        const {error}=schemas.add.validate(req.body);
        if(error){
          throw createError(400, "missing required name field");
        }
        const result=await Contact.create(req.body);
        res.status(201).json(result);
    };

  module.exports=add;