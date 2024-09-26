
const {Contact} = require("../../models/contact");


const getAllContact = async (req, res) => {
    const {_id: owner} = req.user;
    // console.log(req.query);
    const {page = 1, limit = 10} = req.query;
    const skip = (page-1)*limit;
    const result = await Contact.find({owner},"-createdAt -updatedAt", {skip, limit}).populate("owner", "name email subscription");
   
    res.json(result);
    
};



module.exports = getAllContact