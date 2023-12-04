const contact = require("../models/contacts");
const notFoundMiddleware = require("../middlewares/notFound");


const createConctact = (req, res)=>{
    try{
        const {success, result, message} = contact.createContact(req.body);
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
    getAll,
    getById,
    addContact,
    removeContact,
    updateContact,
    createConctact,
    findContact,
    findByIdContact
}