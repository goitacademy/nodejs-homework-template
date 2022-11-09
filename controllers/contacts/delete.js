const { Contact } = require("../../model/contacts");

const remove = (async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
        res.status(404).json({
            code: 404,
            "message": "Not Found"
        });
    };

    res.json({
        code: 204,
        message: "contact deleted",
        result
    });

});

module.exports = remove;