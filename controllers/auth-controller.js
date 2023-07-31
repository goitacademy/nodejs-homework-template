import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

dotenv.config();
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({ email });
  
    if (user) {
        res.status(409).json({ message: 'Email in use' });
        return;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({...req.body, password:hashPassword});

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription
        }
    })
};


const login = async(req, res) => {
    const { email, password, subscription } = req.body; 
    const user = await User.findOne({ email });
    if (!user) { 
        res.status(401).json({ message: 'Email or password wrong' });
        return;
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
         res.status(401).json({ message: 'Email or password wrong' });
        return;
    }
    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, {token})
    
    res.status(200).json({
        token,
        user: {
            email,
            subscription: user.subscription
        }
    })
}

const current = (req, res) => {
    const { email, subscription } = req.user;
    res.json({
        email,
        subscription})
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json({message: "No content"})
}

const updateSubscription = async (req, res) => {
    const {id } = req.params;
    const { subscription } = req.body;
    const updatingSubscription = await User.findByIdAndUpdate(id, { subscription: subscription }, { new: true });
    res.json(updatingSubscription);
}

export default {
    register,
    login,
    current,
    logout,
    updateSubscription,
}