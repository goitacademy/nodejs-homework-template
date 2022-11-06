const { getContactById } = require('../../models/contacts');

const getById = (async (req, res) => {

    const { id } = req.params;
    const result = await getContactById(id);

    if (!result) {
        res.status(404).json({
            code: 404,
            "message": "Not found"
        });
    };
    res.status(200).json(result);
    
});

module.exports = getById;
