const { getListContacts } = require('../../service')
const { catchAsync } = require('../../utils')


const getContacts = catchAsync(async (req, res, next) => {
    const data = await getListContacts();
    res.json({
        status: 'success',
        code: 200,
        data,
    })
});

module.exports = getContacts