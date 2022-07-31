const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
    const { id: owner } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, "-createdAt, -updatedAt", {skip , limit: Number(limit)})
        .populate('owner', 'email subscription');
    if (favorite) { 
        const favoriteContacts = result.filter(el => el.favorite === true);
        res.json(favoriteContacts);
    }
    res.json(result);
}

module.exports = getAll;