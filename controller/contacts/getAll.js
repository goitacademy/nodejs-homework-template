const { Contact } = require("../../models");

const getAll = async (req, res) => {
    const { id } = req.user;
    const { page = 1, limit = 10, favorite: reqFavorite = null } = req.query;

    const favorite = reqFavorite === null ? { $exists: true } : reqFavorite;

    const skip = (page - 1) * limit;
    const data = await Contact.find({ owner: id, favorite }, "", {
        skip,
        limit: Number(limit),
    }).populate("owner", "_id name email subscription");

    res.status(200).json({ status: "success", code: 200, data });
};

module.exports = getAll;
