/* const { Owner } = require('../../models')

const subscription = async (req, res) => {
    const newOwner = { ...req.body, owner: req.user._id };
    const result = await Owner.create(newOwner);
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            result
        }
    })
}

module.exports = subscription */