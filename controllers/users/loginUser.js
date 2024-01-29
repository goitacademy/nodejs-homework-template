import { User, loginSchema } from "#schemas/users.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()

export const loginUser = async (req, res, next) => {

const validationResult = loginSchema.validate(req.body);

    if (validationResult.error) {
      res.status(400).json({
        POST: `/users/login`,
        status: `400 - Bad request`,
        'Content-Type': 'application/json',
        RequestBody: {
            email: 'example@example.com',
            password: 'examplepassword',
        },

        ResponseBody: validationResult.error,
      });
      return;
    }
  
try {
const { email,password } = req.body 
const user = await User.findOne({ email })
const passwordCompare = await bcrypt.compare(password, user.password)

if (!user || !passwordCompare) {
    res.status(401).json({
        status: `401 - Unauthorized`,
        ResponseBody: { message: 'Email or password is wrong'},
    })
    return
}

const payload = {
    id: user._id,
}
const SECRET_KEY = process.env.SECRET_KEY
const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '5m'})
await User.findByIdAndUpdate(user._id, {token})
res.json({
    status: `200 - OK`,
    'Content-Type': 'application/json',
    RequestBody: {
        token: token,
        user: {
           email: user.email,
           subscription: user.subscription,
        },
        
    },
})
} catch (error) {
    console.log(error)
    next(error)
    return res.status(500).json({message: 'Server error'})
}

}