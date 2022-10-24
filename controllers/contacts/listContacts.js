
const { Contact } = require("../../models/contacts");

const listContacts = async (req, res) => {

    const { id: owner } = req.user

    const { page = 1, limit = 20 } = req.query

    const skip = (page - 1) * limit

    const reply = await Contact.find({ owner }, '-createdAt -updatedAt', { skip, limit: Number(limit) }).populate('owner', 'name email')
    
    res.json(reply)
}


module.exports = listContacts;