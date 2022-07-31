const {Contact} = require("../../models/contact");

const getAll = async (req, res) => {
      const {id: owner} = req.user;
      const {page = 1, limit = 20, favorite} = req.query;
      const skip = (page-1)*limit;
      console.log(skip)
      const result = await Contact.find({owner, favorite}, "-createdAt - updateedAt", {skip, limit:Number(limit)})
            .populate("owner", "name email");
      res.json(result);
}

module.exports = getAll;