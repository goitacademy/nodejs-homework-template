const { Contact } = require("../../models");


const getAll = async (req, res, next) => {
      const {_id: owner} = req.user;
      const result = await Contact.find({owner});
      res.status(200).json(result)
  }

  module.exports = getAll;