const contactsOperation = require('../../model/db');
const { NotFound } = require('http-errors');


const updateById = async (req, res) => {
    
       
        const { id } = req.params;
        const result = await contactsOperation.updateById(id, req.body);
        if (!result) {
            throw new NotFound(`contact whits id=${id} not found`)
        }
        res.json({
            status: 'success',
            code: 200,
            data: {
                result
            }
        })
    
};

module.exports = updateById;