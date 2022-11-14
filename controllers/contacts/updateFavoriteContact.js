const { Contact } = require("../../model/contacts");

const updatefavoriteContact = async (req, res) => {
    const { id } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(id, { favorite }, { new: true });
    
    if (result) {
        return res.json({
            status: 'success',
            code: 200,
            data: {
                result
            }
        });
    } else {
        return res.status(404).json({
            status: 'error',
            code: 404,
            data: 'Not Found'
        })
    };

};

module.exports = updatefavoriteContact;