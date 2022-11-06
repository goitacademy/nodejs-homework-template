const { listContacts } = require('../../models/contacts');

const getAll = (async (req, res) => {
    const result = await listContacts();
    res.json({
        status: 200,
        result
    });
});



module.exports = getAll;