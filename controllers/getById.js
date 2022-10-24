const {Contact} = require('../models/contact')

const getById = async (req, res, next) => {
        const {contactId} = req.params
        const result = await Contact.findById(contactId)
        res.status(200).json(result)
        // if(result !== null){
        //   res.status(200).json(result)
        // }
        // res.status(404).json({ message: 'Not found' })
}

module.exports = getById