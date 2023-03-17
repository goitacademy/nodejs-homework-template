const { catchAsync } = require('../../utils')
const { registration } = require('../../service/auth')



const registarationController = catchAsync(async (req, res, next) => {
    const { email, password } = req.body

    await registration(email, password)

    res.status(201).json({
        status: 'created',
    })
})

module.exports = registarationController