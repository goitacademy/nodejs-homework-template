const { Contact } = require("../../model/contacts");


const getByIdContact = (async (req, res) => {

    const { id } = req.params;
    const result = await Contact.findById(id);

    if (!result) {
        res.status(404).json({
            code: 404,
            "message": "Not found"
        });
    };
    res.status(200).json(result);
    
});

module.exports = getByIdContact;
