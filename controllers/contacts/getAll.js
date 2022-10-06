const { Contact } = require('../../models/index');

const getAll = async (req, res) => {
    const { id } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;

    if (favorite) {
        const result = await Contact.find({ owner: id, favorite: true }, '', { skip, limit: Number(limit) })
            .populate('owner', '_id email');
        res.json({ status: 'success', code: 200, data: { result } })
        return;
    }

    const result = await Contact.find({ owner: id }, '', { skip, limit: Number(limit) })
        .populate('owner', '_id email');
    res.json({ status: 'success', code: 200, data: { result } })
}

module.exports = getAll;