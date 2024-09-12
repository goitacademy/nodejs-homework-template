const { Contact } = require('../../models/contact');

const { createError } = require('../../helpers');

 

const getAll = async (req, res) => {
    const { id: owner } = req.user;

    const {page = 1, limit = 20} = req.query;

    const skip = (page - 1) * limit;
    
    const result = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit: Number(limit)}).populate("owner", "name email");
     
     

    res.json(result);
     
}

module.exports = getAll;