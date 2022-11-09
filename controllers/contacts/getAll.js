const { Contact } = require("../../model/contacts");

const getAll = (async (req, res) => {
    const result = await Contact.find({});
    res.json({
        status: 200,
        result
    });
});



module.exports = getAll;