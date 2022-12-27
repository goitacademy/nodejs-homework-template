const contactsOperation = require('../../model/db')

const getAll = async (req, res, next) => {
    try {
        const contacts = await contactsOperation.getAll();
        res.json({
            status: "success",
            code: 200,
            data: {
                result: contacts
            }
        });
    } catch (error) {
        next(error)
    }
    
};

module.exports = getAll;