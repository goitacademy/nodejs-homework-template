const { getListContacts } = require('../../service/contacts')



const getContacts = async (req, res, next) => {
    const { _id } = req.user
    console.log(req.user)

    const data = await getListContacts(_id);
    res.json({
        status: 'success',
        code: 200,
        data,
    })
};

module.exports = getContacts