const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
    const { id: owner } = req.user;
    const result = await Contact.find({ owner }, "-createdAt, -updatedAt")
        .populate('owner', 'email subscription');
    res.json(result);
}

module.exports = getAll;