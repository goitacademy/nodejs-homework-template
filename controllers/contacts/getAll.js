const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const {_id: owner} = req.user;
  const {page=1, limit=10, favorite } = req.query;
  const skip = (page - 1) * limit;
  
  if (favorite) {
    const favoriteData = await Contact.find({ owner, favorite: true });

    res.json({
        favoriteData,
    });
};
  const result = await Contact.find({owner}, "", {skip, limit: Number(limit)})
                            .populate("owner", "_id email")
  res.json(result);
};

module.exports = getAll;
