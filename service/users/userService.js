const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



const { User } = require('./userSchema');
const { UserVerification } = require('../userVerification/userVerificationSchema');
const { RegistrationConflictError, NotAuthorizedError, ResendingVerificationError} = require("../../helpers/index");
const { VerificationError } = require("../../helpers/index");

const registration = async (email, password) => {
    const user = await User.findOne({ email });
    
    if (user) {
        throw new RegistrationConflictError(`Email '${email}' is already in use`);
    }
    
    const createdUser = new User({
        email,
        password: await bcrypt.hash(password, 10),
        avatarURL: gravatar.url(email),
    });
    await createdUser.save();

    const verificationCode = uuidv4();

    const verification = new UserVerification({
        code: verificationCode,
        userId: createdUser._id,
    })

    await verification.save();

    const msg = {
        to: email,
        from: 'sandbox.mailing@meta.ua',
        subject: 'Please, verify your email',
        text: 'Please, verify your email',
        html:`<h1>It is almost ready!</h1> <p>Please, go on this <a href="http://localhost:3000/users/verify/${verificationCode}">link</a> for completing the registration</p>`, 
    }

    await sgMail.send(msg);
    
    return createdUser;

}
const registrationConfirmation = async (verificationToken) => {

    const verification = await UserVerification.findOne({
        code: verificationToken,
        active: true

    })

    if (!verification) {
        throw new VerificationError('User not found');
    }
    
    const user = await User.findById(verification.userId);

    if (!user) {
        throw new VerificationError('User not found');
    }
    verification.active = false;
    await verification.save();

    user.verify = true;
    user.verificationToken = "";
    await user.save();

    const msg = {
        to: user.email,
        from: 'sandbox.mailing@meta.ua',
        subject: 'Registration completed!',
        text: 'Thanks for joining us!',
        html:`<h2>Thanks for joining us!</h2>`, 
    }

    await sgMail.send(msg);
}


const resendingConfirmation = async (email) => {

    const user = await User.findOne({
        email,
        verify: false
    });

    if (!user) {
        throw new ResendingVerificationError("Verification has already been passed");
    }
    
     const verification = await UserVerification.findOne({
        userId: user._id,
    });

     const msg = {
        to: email,
        from: 'sandbox.mailing@meta.ua',
        subject: 'Please, verify your email',
        text: 'Please, verify your email',
        html:`<h1>It is almost ready!</h1> <p>Please, go on this <a href="http://localhost:3000/users/verify/${verification.code}">link</a> for completing the registration</p>`, 
    }

    await sgMail.send(msg);


}

const login = async (email, password) => {
    const user = await User.findOne({ email});

    if (!user || ! await bcrypt.compare(password, user.password)) {
        throw new NotAuthorizedError("Email or password is wrong");
    }

    if (user.verify !== true) {
        throw new NotAuthorizedError("You need to confirm your registration");
    }

 
    const token= jwt.sign({
        _id: user._id,
        createdAt: user.createdAt
    }, process.env.JWT_SECRET);

    const userData = { token, user };

    return userData;
}



module.exports = {
    registration,
    login,
    registrationConfirmation,
    resendingConfirmation
 
}