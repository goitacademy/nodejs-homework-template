const { Contact } = require('../../models/contacts');

const listContacts = async (req, res) => {
    const { _id: owner } = req.user;
   
    const { page = 1, limit = 10, favorite } = req.query;
    const skip = (page - 1) * limit;
    console.log(favorite)

    let result = await Contact.find({owner}, "-createdAt -updatedAt", { skip, limit }).populate('owner', 'email');
    
    if (favorite) {

        const filteredResult = result.filter((item) => item.favorite.toString() === favorite);

       result =filteredResult
    }

    res.json(result);

};

module.exports = listContacts;