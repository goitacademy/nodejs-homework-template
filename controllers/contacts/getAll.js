const contactsOperation = require('../../model/db')

const getAll = async (req, res) => {
    
        const contacts = await contactsOperation.getAll();
        res.json({
            status: "success",
            code: 200,
            data: {
                result: contacts
            }
        });
    
    
};

module.exports = getAll;