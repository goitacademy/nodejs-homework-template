import { Request, Response } from "express";
import createError from "../../helpers/createError";
import Contact from "../../models/contacts";
import { TRequestAddUser } from "../../helpers/userTypesTS";
const removeById = async (req: TRequestAddUser, res: Response) => {
    if (!req.user) {
        throw createError({
            status: 401
        })
    }

    const { contactId } = req.params;

    const result = await Contact.model.findOneAndRemove({
        _id: contactId,
        owner: req.user._id,
    });

    if (!result) {
        throw createError({ status: 404 });
    }
    res.json(result);
}

export default removeById;