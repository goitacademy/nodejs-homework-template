
const contact = require("../service/contacts");
const validationContact = require("../schemas/joi");

const createConctact = async (req, res)=>{

    const {error} = validationContact.validate(req.body);
    if(error) {
        return res.status(400).json({
            result,
            message
        })
    }
    try{
        const {success, result, message} = await contact.createContact(req.body);
        console.log(result);
        if(!success) {
            return res.status(400).json({
                result,
                message
            })
        }
        return res.status(201).json({
            result,
            message
        })
    }catch (error) {
        return res.status(500).json({
            result: null,
            message: error
        })
    }
}


const findContact = async (req, res)=>{
    try{
        const {success, result, message} = await contact.findContact();
        console.log(result);
        if(!success) {
            return res.status(400).json({
                result,
                message
            })
        }
        return res.status(200).json({
            result,
            message
        })
    }catch (error) {
        return res.status(500).json({
            result: null,
            message: error
        })
    }
}

const findByIdContact = async (req, res)=>{
    const {error} = validationContact.validate(req.params.id);
    if(error) {
        return res.status(400).json({
            result,
            message
        })
    }
    try{
        const {success, result, message} = await contact.findByIdContact(req.params.id);
        console.log(result);
        if(!success) {
            return res.status(400).json({
                result,
                message
            })
        }
        return res.status(200).json({
            result,
            message
        })
    }catch (error) {
        return res.status(500).json({
            result: null,
            message: error
        })
    }
}

const updateContact = async (req, res)=>{
    try{
        const {success, result, message} = await contact.updateContact(req.params.id, req.body);
        console.log(result);
        if(!success) {
            return res.status(400).json({
                result,
                message
            })
        }
        return res.status(200).json({
            result,
            message
        })
    }catch (error) {
        return res.status(500).json({
            result: null,
            message: error
        })
    }
}




module.exports = {
    updateContact,
    createConctact,
    findContact,
    findByIdContact
}