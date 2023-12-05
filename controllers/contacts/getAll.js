const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers/index");


const getAll = async (req, res) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 20} = req.query;
    const skip = (page -1) * limit;
    const result = await Contact.find({ owner })
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .populate("owner", "username email");
    // const result = await Contact.find({owner}, {skip, limit}).populate("owner", "username email");
    
    res.send(result);
};


module.exports = { 
    getAll: ctrlWrapper(getAll)
};
