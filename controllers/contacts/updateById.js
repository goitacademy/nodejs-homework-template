const {Contact, schemas} = require('../../models/contact');
const {createError} = require('../../helpers');

const updateById=async (req, res, next) => {
        const {error}=schemas.add.validate(req.body);
        if(error){
          throw createError(400, "missing fields");
        }
        const {contactId}=req.params;
        const result=await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
        if(!result){
          throw createError(404);
        }
        res.json(result);
    };

module.exports=updateById;