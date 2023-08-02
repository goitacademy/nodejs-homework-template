import Contact from '../../models/contact.js';

const getAll = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;

    const result = await Contact.find(
        { owner, favorite: favorite ?? [true, false] },
        "-createdAt -updatedAt",
        { skip, limit })
        .populate("owner", "email subscription");

    res.json(result);
};

export default getAll;