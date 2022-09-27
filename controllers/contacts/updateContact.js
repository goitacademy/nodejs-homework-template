const contacts=require("../../models/contacts");
const {RequestError}=require("../../helpers");
const {addSchema}=require("../../schemas/contact");

const updateContact= async (req, res, next) => {
    const {error}=addSchema.validate(req.body)
    if(error){
    throw RequestError(400,error.message)
    }
    const {body}=req.body
    const {contactId}=req.params;
    const result=await contacts.updateContact(contactId,body)
    if(!result){
    throw RequestError(404,'Not found')
    }
        res.json(result)
}

module.exports=updateContact;