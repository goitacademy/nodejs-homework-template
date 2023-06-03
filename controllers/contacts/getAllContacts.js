const { Contact } = require('../../models');

const getAllContacts = async (req, res, next) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 20, favorite} = req.query;
    const skip = (page -1) * limit;
    
    const result = favorite === 'true' ? 
    await Contact.find({ favorite: true }) : 
    await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "email");
    
    res.json(result);   
};

module.exports = getAllContacts;

