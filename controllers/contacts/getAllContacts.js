const Contacts = require('../../repository/contacts');

const getAllContacts = async (req,res) => {
    const {id:userId} = req.user;
    try {
        const contacts = await Contacts.getAll(userId);
        return res.status(200).json({message:'Get all contacts',code:200, data:contacts})
    } catch (error) {
        res.status(400).json({message:error.message, code:400})
    }
}

module.exports=getAllContacts;