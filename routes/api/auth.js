const express = require('express');
const { User} = require('../../model');
const { joiRegisterSchema,joiLoginSchema } = require('../../model/user')
const { BadRequest, Conflict,Unauthorized } = require('http-errors')
const bcrypt = require('bcryptjs');
const gravatar=require('gravatar')
const jwt = require('jsonwebtoken');
const { SECRET_KEY, SITE_NAME } = process.env;
const router = express.Router();
const {nanoid} = require('nanoid');
const {sendEmail}= require('../../helpers/sendEmail')

router.post('/signup', async (req, res, next)=>{
    try {
        const { error } = joiRegisterSchema.validate(req.body);
        if (error) {
            throw new BadRequest(error.message);
        }
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw new Conflict('User already exist');
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const verificationToken= nanoid();
        const avatarUrl= gravatar.url(email);
        const newUser = await User.create({
          name,
          email,
          password:hashPassword,
          avatarUrl,
          verificationToken
        });

        const data = {
            to: email,
            subject: 'Confirm your email',
            html: `<p>Thank you for joining our service.</p>
                    <hr/>
                    <br/>
                    <p>Please <a target="_blank" href="${SITE_NAME}/api/users/verify/${verificationToken}">Click here to verify your email address</a>.</p>`
          };
          await sendEmail(data)
        res.status(201).json({
            user: {
                name: newUser.name,
                email:newUser.email,
            }
        })
    } catch (error) {
        next(error)
    }
});
router.post('/login', async (req, res, next) => {
    try {
        const { error } = joiLoginSchema.validate(req.body);
        if (error) {
            throw new BadRequest(error.message);
        }
        const { email, password } = req.body;
        const user = await User.findOne({email})
        if (!user) {
            throw new Unauthorized('Email or password is wrong');
        }
        if(!user.verify){
            throw new Unauthorized ('Email not varify')
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            throw new Unauthorized('Email or password is wrong');
        }
        const {_id,name} = user
        const payload = {
            id:_id
        };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" })
        await User.findByIdAndUpdate(_id, { token });
        res.json({
            token,
            user: {
                email,
                name,
            }
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;