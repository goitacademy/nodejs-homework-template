const {Contact} = require("../../models");

const getListContacts = async (req, res) => {
      const {_id} = req.user;
      const {page = 1, limit = 20} = req.query;
      const skip = (page - 1) * limit;
      const result = await Contact.find({owner:_id}, "", {skip, limit: Number(limit)}).populate("owner", "_id email");
      res.json(result);
  }

  module.exports = getListContacts;