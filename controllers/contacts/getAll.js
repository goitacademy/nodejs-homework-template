const Contact = require('../../models/contact')

const {ctrlWrapper} = require('../../helpers')

const getAll = async (req, res) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 20, favorite = true} = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({owner}, '-createdAt -updatedAt', {skip, limit, favorite});
    res.json(result)
  }

  module.exports = {
    getAll: ctrlWrapper(getAll),
  }