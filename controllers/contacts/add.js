const contactsOperation = require('../../model/db');



const add = async (req, res) => {
    
        
        const result = await contactsOperation.add(req.body);
        res.status(201).json({
            status: 'success',
            code: 201,
            data: {
                result
            }
        })
   
};

module.exports = add;