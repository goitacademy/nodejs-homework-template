const {Contact} = require('../../models/contact')

const getAll =   async (req, res) => {
      const {_id: owner} = req.user
      const {page = 2, limit = 2} = req.query;
     const skip = (page - 1) * limit;
      const result = await Contact.find({owner}, {}, {skip, limit})
      res.json(result);
   

  
  }

  module.exports = getAll;