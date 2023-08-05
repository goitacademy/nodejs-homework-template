const User = require('../models/userModel')

const {catchAsync} = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const { userValidator } = require('../utils/joiValidator')
const { bcryptPassword, checkBcryptPass } = require('../services/bcryptPassword')
const { createToken } = require('../services/jwtToken')
const { protect } = require('../middlewares/userMiddlewares')

exports.userSingUp = catchAsync(async (req, res) => {

    const {error, value} = await userValidator(req.body)
    if(error) throw new AppError(400, 'invalid data');


    const emailIsDb = await User.exists({email: value.email})
    if(emailIsDb) throw new AppError(409, 'Email in use');
 
    const hashPass = await bcryptPassword(value.password)
   
        const newUser = await User.create({...value, password: hashPass})
        newUser.password = undefined

        const token = createToken(newUser.id)

        res.status(201).json({
            user: newUser,
            token
        })
})

exports.userLogin = catchAsync( async (req, res) => {

    const {error, value} = await userValidator(req.body)
    if(error) throw new AppError(400, 'invalid data');


        const loginUser = await User.findOne({ email: value.email }).select('+password');
        if(!loginUser) throw new AppError(400, 'invalid data')

        const truePassword = await checkBcryptPass(value.password, loginUser.password)
        if(!truePassword) throw new AppError(400, 'ivalid data')
        
        loginUser.password = undefined

        const token = await createToken(loginUser.id)
        console.log(token)

        res.status(200).json({
            user: loginUser,
            token
        })
})

exports.logOut = catchAsync( async (req, res) => {
    res.sendStatus(204)
})

exports.currentUser = catchAsync(async(req, res) => {
    const {email, subscription} = req.user
    res.status(200).json({
        email,
        subscription
    })
})

exports.getUserById = (id) => User.findById(id)