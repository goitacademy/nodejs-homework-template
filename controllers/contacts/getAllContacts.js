const ContactModel = require("../../models/contact")

const getAllContacts = async (req, res) => { 
        const result = await ContactModel.find()
        res.json(result)
}

module.exports = getAllContacts