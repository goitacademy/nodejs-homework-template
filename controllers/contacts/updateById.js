const {Contact} = require('../../models/contacts');

const {RequestError} = require("../../helpers") ;

const updateById = async(req,res) => {
    const {id} = req.params;
    const result = await Contact.findByIdAndUpdate(id,req.body,{new:true});
    if(!result){
        throw RequestError(404);
    }
    res.status(201).json(result);
}

module.exports = updateById;