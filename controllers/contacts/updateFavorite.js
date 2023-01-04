const {Contact} = require('../../models')
const { NotFound } = require('http-errors');


const updateFavorite = async (req, res) => {
    
       
    const { id } = req.params;
    const { favorite } = req.body;
        const result = await Contact.findByIdAndUpdate(id, {favorite}, {new: true});
        if (!result) {
            throw new NotFound(404,`contact whits id=${id} not found`)
        }
        res.json({
            status: 'success',
            code: 200,
            data: {
                result
            }
        })
    
};

module.exports = updateFavorite;