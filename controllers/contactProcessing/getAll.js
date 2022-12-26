const { listContacts } = require('../../modules/contacts');

const getAll = async (req, res, next) => {
    try {
        const result = await listContacts();
        res.json({
            status: "success",
            code: 200,
            data: {
                result,
            }
        });
        
    } catch (error) {
        next(error)
    }
};

module.exports = getAll;