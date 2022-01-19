const Contacts = require('../../repository/contacts');

const addContact = async (req,res) => {
    const {id:userId} = req.user;
    try {
        const book = await Contacts.create(userId,req.body);
        return res.status(201).json({message:'Add book success',code:201, data:book})
    } catch (error) {
        res.status(400).json({message:error.message, code:400})
    }
}

module.exports = addContact;