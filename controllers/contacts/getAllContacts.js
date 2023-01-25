const {Contact} = require("../../models/index")

const getAllContacts = async (req, res, next) => {
    const { _id } = req.user;
    const { page = 1, limit = 3 } = req.query;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find({owner: _id}, "", {skip, limit: Number(limit)}).populate("owner","_id email" );
    res.json({
            status: 'success',
            code: 200,
            data: {
                result: contacts
            }
        })
}

module.exports = getAllContacts;