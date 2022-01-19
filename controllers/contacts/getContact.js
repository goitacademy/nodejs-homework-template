const Contacts = require('../../repository/contacts');

const getContact = async (req,res) => {
    const id = req.params.id
    const {id:userId} = req.user;
    try {
        const contact = await Contacts.getById(userId, id);

        if(!contact) {
            return res.status(200).json({message:'Cannot find with ID',code:200, data:contact})
        }
        return res.status(200).json({message:'Get contact By Id',code:200, data:contact})
    } catch (error) {
        res.status(400).json({message:error.message, code:400})
    }
}

module.exports=getContact;