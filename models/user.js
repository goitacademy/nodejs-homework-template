<<<<<<< Updated upstream
const { userVerifyJoi, User } = require('../routes/api/user.schema')
const { createToken } = require('./jwt/jwt')
const bcrypt = require("bcrypt");


async function signUpUser(req, res, next) {
    console.log('signUp')
    const { body } = req
    const checkedUser = userVerifyJoi.validate(body)
    const { error, value } = checkedUser;
    console.log('error, value', error, value)
    if (error) {
        console.log('error')
        return res.status(404).json({ message: error.message })
    } else {
        const notUniqueEmail = await User.findOne({ email: value.email })
        if (notUniqueEmail) return res.status(400).json({ message: 'user with current email already exist' })
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(value.password, salt)
        value.password = hashedPassword
        await User.create(value);
        return res.json({
            user: {
                'email': value.email,
                "subscription": "starter",
            }
        }
        )
    }
}

async function loginUser(req, res, next) {
    console.log('login')
    const { body } = req
    const joiValidator = userVerifyJoi.validate(body)
    const { value, error } = joiValidator
    if (error) throw new Error(error.message)
    const user = await User.findOne({ email: value.email });
    const pass = await bcrypt.compare(value.password, user.password)
    if (!user || !pass) {
        throw new Unauthorized("message: Email or password is wrong");
    }
    const token = await createToken({ _id: user._id })
    user.token = token;
    const x = await User.findByIdAndUpdate(user._id, user);
    console.log('x', x)
    return res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        }
    })
}

async function logoutUser(req, res, next) {
    const { body: { _id } } = req
    try {
        const currentUser = await User.findById(_id)
        if (currentUser.token = null) return res.json({ mes: 'alredy loged out' })
        currentUser.token = null
        await User.findByIdAndUpdate(_id, currentUser, { new: true })
        console.log('updated null token')
        return res.json({ 'user': 'logout succsess' })

    } catch (error) {
        console.log('error logout', error)
    }
}


async function getUsers(req, res, next) {
    console.log('getUsers', getUsers)
    const allUsers = await User.find()
    console.log('allUsers', allUsers)
    return res.json({ 'users': allUsers })
}

async function currentUser(req, res, next) {
    console.log('cutrrentUserFunc')
    console.log('req.user cutrrentUserFunc', req.user)
    return res.json({
        "email": req.user.email,
        "subscription": req.user.subscription })
}


module.exports = {
    getUsers,
    signUpUser,
    loginUser,
    logoutUser,
    currentUser,
}
=======
// const Joi = require('joi');
const { User } = require('../routes/api/schemasUser')
const { userDataValidatorJoi } = require('../routes/api/schemasUser')
const { createToken } = require('./jwt/jwt')
const bcrypt = require("bcrypt");

async function connectSuccsessfull(req, res, next) {
    const data = await User.find()
    return res.json({'connected to user, data': data})
}


async function signUp(req, res, next) {
    console.log('signUp start')
    const {body} = req
    console.log('body signUp', body)
    const dataCheck = await userDataValidatorJoi(body)
    const { value, error } = dataCheck
    // console.log('value, error', value, error)
    if (error) {
        throw new Error(error)
    } else {
        const { password, email } = value
        // const uniqueEmail = await User.find({ email })
        // if (!uniqueEmail) return res.status(409).json({ "message": "Email in use" })
        const token = await createToken(value)
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.create({
            hashedPassword,
            email,
            token,
        })
        return res.status(201).json({
            "user": {
                "email": email,
                "subscription": "starter"
            }
        })
    }
/*

Если почта уже используется кем-то другим, вернуть Ошибку Conflict.
В противном случае вернуть Успешный ответ. */

}





module.exports = {
    signUp,
    connectSuccsessfull,
}

>>>>>>> Stashed changes
