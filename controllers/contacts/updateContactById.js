const {joiContactSchema} = require("../../validation/contactSchema");
const updateContactsList = require("../../model/contacts/updateContactsList");

const updateById = async (req, res, next)=> {
    try {
        const {error} = joiContactSchema.validate(req.body);
        if(error){
            return res.status(400).json({
                message: error.message
            })
        }
        const {id} = req.params;
        const updateConract = await updateContactsList(contactId, req.body);
        if(!updateConract) {
            return res.status(404).json({
                "message": "Not found"
            });
        }
        res.json({
            updateConract
        })
    }
    catch(error){
        next(error);
    }
};

module.exports = updateById;