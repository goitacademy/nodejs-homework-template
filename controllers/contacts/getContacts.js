const { getListContacts } = require('../../service/contacts')



const getContacts = async (req, res, next) => {
    const data = await getListContacts();
    res.json({
        status: 'success',
        code: 200,
        data,
    })
};

module.exports = getContacts