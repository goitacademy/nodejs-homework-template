const { Contact } = require('../../models/contacts');

const getAll = async (req, res) => {
    const { _id } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find(favorite ? { owner: _id, favorite }: {owner: _id}, '', {skip, limit: Number(limit)}).populate('owner', '_id email');
    res.json({
         status: "success",
        code: 200,
        data: {
            result
        }
    });
}

module.exports = getAll;