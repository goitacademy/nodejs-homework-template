const Contact = require("../../models/contact");

const getAll = async (req, res) => {
  const {_id: owner} = req.user;
  const {page = 1, limit = 20} = req.query;
  const skip = (page - 1) * limit;
  let query = { owner };

  if (favorite) {
    query.favorite = favorite === "true";
  }

  const result = await Contact.find(query, "-createdAt -updatedAt", {skip, limit}).populate("owner", "email");
  res.json(result);
};

module.exports = getAll;
