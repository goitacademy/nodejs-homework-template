const Contact = require("../../models/contact");

const { ctrlWrappers } = require("../../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5, ...query} = req.query;
  const skip = (page - 1) * limit;
      const result = await Contact.find({owner, ...query},  "-createdAt -updatedAt", { skip, limit});
      res.json(result);
}

module.exports = {getAll: ctrlWrappers(getAll)}