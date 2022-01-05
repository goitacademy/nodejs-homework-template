const { Contact } = require("../../model");
const { joiContactSchema } = require("../../model/contact");

const updateById = async(req, res, next)=> {
    const {error} = joiContactSchema.validate(req.body);
    if(error){
        return res.status(400).json({message: "Bad Request"})
    }
    const {id} = req.params;
    const updateContact = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if(!updateContact){
        return res.status(404).json({message: "Not Found"})
    }
    res.json(updateContact)
}

module.exports = updateById;