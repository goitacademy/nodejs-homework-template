const {Contact} = require('../../models');


const listContacts = async (req, res, next) => {
    const {_id} = req.user;
    const {page = 1, limit = 20} = req.query;
    const skip = (page - 1) * limit;
    try {
        const contacts = await Contact.find({owner:_id}, "", {skip, limit: Number(limit)}).populate("owner", "_id  email");
        res.status(200).json(
            contacts
        );
    } catch (error) {
        next(error);
    }
}

module.exports = listContacts;