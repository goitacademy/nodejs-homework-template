const User = require('../../models/users/users');
const { subscpiptionUserUpdateValiadation, emailValiadation } = require('../../valiadators/joiValiadator');
require('dotenv').config('./.env');
const { BASE_URL } = process.env;
const { sendgrigMail } = require('../../helpers/sendgridMail');

const getCurrent = async (req, res) => {
    try {
        const { email, subscription } = req.user;
        const userI = await User.findOne({ email });
        if (!userI || !subscription) {
            return res.status(401).json({
                message: "Email or password is wrong"
            });
        }
        User.findByIdAndUpdate(userI._id, { subscription });
        return res.status(200).json({ user: { email: email, subscription: subscription } })
    } catch (err) {
        res.status(500).json({ message: 'Ooops... Something wrong in DB' });
    }
}

const changeUserSubscription = async (req, res) => {
    const { subscription } = req.body;
    try {
    const { error, fieldName } = subscpiptionUserUpdateValiadation(subscription);
    if (error) {
      return res.status(400).json({
        message: `missing required ${fieldName} field`
      })
    }
        
        const { id } = req.user;
        await User.findByIdAndUpdate(id, { subscription });
        return res.status(201).json({ message: 'Contact is updated' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Ooops... Something wrong in DB' });
    }
}

const reVerificationEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const { error, fieldName } = emailValiadation({email});
        if (error) {
            return res.status(400).json({
                message: `missing required ${fieldName} field`
            })
        }
        const item = await User.findOne({email});
        if (!item) {
        return res.status(400).json({ message: 'User not found' });
        }
        if (item.verify) {
        return res.status(400).json({message: "Verification has already been passed"}); 
        }
            const verificationEmail = {
            to: email,
            subject: "Verify your email AGAIN",
            html: `<a target="_blanc" href="${BASE_URL}/api/users/verify/${item.verificationToken}">Click here for verificatioin</a>`
        }
        await sendgrigMail(verificationEmail);
        res.status(200).json({message: "Verification complete"}); 
    } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Ooops... Something wrong in DB' });
        }
    }

module.exports = {
    getCurrent,
    changeUserSubscription,
    reVerificationEmail
}