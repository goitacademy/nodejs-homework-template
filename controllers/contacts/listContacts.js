const fs = require('fs/promises');
const Contact = require('../../models/contacts/contacts');


const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
    try {
        const { page = 1, limit = 20, favorite = false } = req.query;
        const skip = (page - 1) * limit;
        let panginationString = { owner }
        !favorite ? panginationString = {owner} : panginationString = { owner , favorite };
             console.log(favorite, panginationString)
        const contactsList = await Contact.find( panginationString , "-createdAT -updatedAT", {skip, limit});  
        return res.status(200).json(contactsList);   
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Ooops... ListContacts'})
    }
}

module.exports = {
    listContacts
}