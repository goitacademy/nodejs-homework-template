const {Contact} = require('../../models/contact')
const getAll = async (req, res, next) => {
  const {_id} = req.user;
  const {page = 1, limit = 20, favorite} = req.query;
  const skip = (page - 1) * limit;
const result = favorite
  ? await Contact.find({owner: _id,  favorite}, "", {skip, limit: +limit}).populate("owner", "_id email subscription") 
  : await Contact.find({owner: _id}, "", {skip, limit: +limit}).populate("owner", "_id email subscription") 

    res.json({
      status: "success",
      code: 200,
      data: {result}}); 
  }

module.exports = getAll;