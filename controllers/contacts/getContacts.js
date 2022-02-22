const { Contact } = require('../../models/contact');


const getContacts = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, favorite = false } = req.query;
        const skip = (page - 1) * limit;
        const { _id } = req.user
        const result = await Contact
            .find({ owner: _id, favorite }, "-createdAt -updatedAt", { skip, limit: +limit })
            .populate('owner', 'email');
        res.json(result);
    } catch (error) {
        next(error)
    }
  
};


module.exports = getContacts;

