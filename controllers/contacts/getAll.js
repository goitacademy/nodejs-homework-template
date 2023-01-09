const {Contact} = require('../../models')

const getAll = async (req, res) => {
    const { _id } = req.user;
    const contacts = await Contact.find({owner: _id}).populate("owner", "_id email name phone");
        res.json({
            status: "success",
            code: 200,
            data: {
                result: contacts
            }
        });
    
    
};

module.exports = getAll;