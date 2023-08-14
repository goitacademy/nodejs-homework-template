const multer = require('multer');
const pathFn = require('path');
const uuid = require('uuid').v4;
const fse = require('fs-extra');
const Jimp = require("jimp");
const crypto = require('crypto');

const User = require('../models/userModel')

const {catchAsync} = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const { userValidator } = require('../utils/joiValidator')
const { bcryptPassword, checkBcryptPass } = require('../services/bcryptPassword')
const { createToken } = require('../services/jwtToken')
const { protect } = require('../middlewares/userMiddlewares');
const SendEmail = require('../services/emailServise');

exports.userSingUp = catchAsync(async (req, res) => {

    const {error, value} = await userValidator(req.body)
    if(error) throw new AppError(400, 'invalid data');


    const emailIsDb = await User.exists({email: value.email})
    if(emailIsDb) throw new AppError(409, 'Email in use');
 
    const hashPass = await bcryptPassword(value.password)
    const verToken = crypto.randomBytes(32).toString('hex')
    console.log(verToken)
   
        const newUser = await User.create({...value, password: hashPass, verificationToken: verToken})
        newUser.password = undefined

        const token = createToken(newUser.id)

    console.log(newUser)  


        //sendEmail
        try {
            const resetUrl = `${req.protocol}://${req.get('host')}/users/verify/${verToken}`;

            await new SendEmail(newUser, resetUrl).veryfiEmail()
        } catch (error) {
            console.log(error)
        }


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

exports.addAvatar = catchAsync(async(req, res) => {

    const {user, file, body} = req;
    
    if (file) {

        user.avatarURL = await newImageUser()
        
        async function newImageUser () {
            const {filename, path} = file
            const {id} = user
            const newPath =  pathFn.join(process.cwd(), 'public', 'avatars', id);


            await fse.emptyDir(newPath)
            await Jimp.read(path)
                .then((avatar) => {
                    return avatar
                        .cover(500, 500) // resize
                        .quality(90) // set JPEG quality
                        .writeAsync(pathFn.join(newPath, filename)); // save

                }).catch((err) => {
                    console.error(err);
                });

            return pathFn.join('avatars', id, filename)
            
        }
    }

    Object.keys(req.body).forEach((key) => {
        user[key] = req.body[key]
    })

    const updatedUser = await user.save();

    res.status(200).json({
        "avatarURL": user.avatarURL
    });
})

exports.emailVerification = catchAsync( async (req, res) => {
    console.log(req.params.verificationToken)
    const hashedToken = crypto.createHash('sha256').update(req.params.verificationToken).digest('hex')

    const user = await User.findOne({
        verificationToken: hashedToken
    })

    console.log(user)

    if(!user) throw new AppError(404, "User not found")

    user.verify = true
    user.verificationToken = "null"

    await user.save()

    res.status(200).json({
        message: 'Verification successful',
    })
})

exports.sendEmailForVerification = catchAsync(async(req, res) => {
    const {email} = req.body
    if(!email) throw new AppError(400, "missing required field email")

    const user = await User.findOne({email})
    if(!user) throw new AppError(400, 'User not found')
    if(user.verify) throw new AppError(400, "Verification has already been passed")

    const verifyToken = user.createVerificationToken()
    await user.save()

    try {
        const resetUrl = `${req.protocol}://${req.get('host')}/users/verify/${verifyToken}`;

        await new SendEmail(user, resetUrl).veryfiEmail()
    } catch (error) {
        console.log(error)
    }

    res.status(200).json({
        "message": "Verification email sent"
    })
})