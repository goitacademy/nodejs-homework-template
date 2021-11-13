const { User } = require('../../model')
const { Unauthorized, NotFound } = require('http-errors')
const bcript = require('bcryptjs')
const jvt = require('jsonwebtoken')

const {SECRET_KEY} = process.env

const loginController = async(req, res, next)=> {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            throw new NotFound(`User with email: ${email} not found`)
        }
        const compareResult = bcript.compareSync(password, user.password)
        if (!compareResult) {
            throw new Unauthorized('Email or password is wrong')
        }
        const payload = {
            id: user._id
        }
        const token = jvt.sign(payload, SECRET_KEY, {expiresIn: '1h'} )
        await User.findByIdAndUpdate(user._id, {token})

        res.json({
        status: 'Ok',
        code: 200,
        data:  {
             token,
             user: {
               email,
               subscription: "starter" 
            }}
        })

     
    } catch (error) {
        next(error)
    }
}

module.exports = loginController