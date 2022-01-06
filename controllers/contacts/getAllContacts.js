const Contact = require('../../models/contact');

const getAllContacts = async (req,res) => {
    try {
        const contacts = await Contact.find();
        return res.status(200).json({message:'Get all contacts',code:200, data:contacts})
    } catch (error) {
        res.status(400).json({message:error.message, code:400})
    }
}

module.exports=getAllContacts;