import { Response } from "express";
import { lstat } from "fs/promises";
import path from "path";
import createError from "../../helpers/createError";
import { TRequestAddUser } from "../../helpers/userTypesTS";
import modelUser from "../../models/users/modelUser";
import avatarUpdate from "../../helpers/avatarUpdate";

const setAvatar = async (req: TRequestAddUser, res: Response) => {
    // to check: is authoritation authorized
    if (!req.user) {
        throw createError({
            status: 401
        })
    }
    const { _id } = req.user;

    // to check: is avatar image available 
    if (!req.file) {
        throw createError({
            status: 400,
        })
    }

    // to check: is path to avatar's template folder valid
    const { path: tempPath, originalname } = req.file;
    try {
        await lstat(tempPath);
    } catch (error) {
        throw createError({
            status: 500,
            messageProd: "temp folder does not exist",
        })
    }

    // to check: is path to avatar's upload folder valid
    const avatarDir = path.join(__dirname, '..', '..', 'public', "avatars");
    try {
        await lstat(avatarDir);
    } catch (error) {
        throw createError({
            status: 500,
            messageProd: "avatar folder does not exist",
        })
    }

    // to do: create new name and path to the avatar
    const [extention] = originalname.split('.').reverse();
    const newName = `${_id}.${extention}`;
    const pathUpload = path.join(avatarDir, newName);

    //to do:
    //replace avatar-image to public folder from temp
    //resize avatar-image to 250x250 
    await avatarUpdate(tempPath, pathUpload);

    // to do: update avatarURL
    const avatarURL = path.join("avatars", newName);
    await modelUser.findByIdAndUpdate(_id, { avatarURL }, { new: true });

    // to respond
    res.json({
        avatarURL,
    })
}

export default setAvatar;