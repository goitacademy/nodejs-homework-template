const {Contact} = require('../../models');


const listContacts = async (req, res, next) => {
    const {_id} = req.user;
    try {
        const contacts = await Contact.find({owner:_id}).populate("owner", "_id  email");
        res.status(200).json(
            contacts
        );
    } catch (error) {
        next(error);
    }
}

module.exports = listContacts;