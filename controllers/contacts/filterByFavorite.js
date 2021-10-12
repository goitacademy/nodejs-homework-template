const { Contact } = require('../../models/contact');

const updateFavoriteStatus = async (req, res) => {
    const { favorite } = req.favorite;
    const result = await Contact.find({ favorite: favorite });
    res.json({
        status: 'success',
        code: 200,
        data: {
            result
        }
    })

}

module.exports = updateFavoriteStatus;