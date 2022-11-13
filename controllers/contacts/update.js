const { Contact } = require("../../model/contacts");

const update = (async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body);
    if (result) {
        return res.json({
            status: 'success',
            code: 200,
            data: {
                result
            }
        })
    } else {
        return res.status(404).json({
            status: 'error',
            code: 404,
            data: 'Not Found'
        })
    }

});

module.exports = update;
