const {Contact} = require("../../models/contact")

const getAllContacts =  async (req, res) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 3} = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit} ).populate("owner", "name email");
     res.json(result);
   };


module.exports = getAllContacts;