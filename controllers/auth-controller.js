import User from "../models/User.js";
import { ctrlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const { JWT_SECRET } = process.env;


/*const decodeToken = jwt.decode(token);
//console.log(decodeToken);

try {
  const {id} = jwt.verify(token, JWT_SECRET);
  console.log(id);
}
catch(error) {
  console.log(error.message);
}*/



const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "This email is already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({
        password: newUser.password,
        email: newUser.email,
    })
};


const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password is invalid");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is invalid");
    }

    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

    res.json({
        token,
    })
}


export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
}