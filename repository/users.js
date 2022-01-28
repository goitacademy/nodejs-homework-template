import User from "../modal/user.js";
import {randomUUID} from 'crypto'

const findById = async (id) =>{
return await User.findById(id)
};
const findByEmail = async (email) =>{
    // console.log('findByEmail', email);
    return await User.findOne({email})
    };
 const findByvrifyToken = async (verifyTokenEmail) =>{
        // console.log('findByEmail', email);
        return await User.findOne({verifyTokenEmail})
        };

const create = async (body) =>{

    const user = new User(body);

    return await user.save()

}
const updateToken = async (id, token) =>{
    return await User.updateOne({_id: id}, {token})
}

const updateverify = async (id, status) =>{
    return await User.updateOne({_id: id},
         {isVerify: status, verifyTokenEmail: null})
}

const updateVerifyToken = async (id, status) =>{
    return await User.updateOne({_id: id},
         {isVerify: status, verifyTokenEmail: randomUUID() })
}

const updateAvatar = async (id, avatar, idAvatarCloud = null) =>{
    return await User.updateOne({_id: id}, {avatar, idAvatarCloud})
}
export default {
    findById, 
    findByEmail, create, 
    updateToken,
    updateAvatar,
    findByvrifyToken,
    updateverify,
    updateVerifyToken
}