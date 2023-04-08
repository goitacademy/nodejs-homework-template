const contacts = require('../../models/contacts')

const {RequestError} = require("../../helpers") ;

const removeById = async(req,res) => {
    const {id} = req.params;
    const result = await contacts.removeContact(id);
    if(!result){
        throw RequestError(404)
    }
    res.json({
        message:'Delete success'
    });
}

module.exports = removeById;