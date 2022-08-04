import { Response } from "express";
import createError from "../../helpers/createError";
import Contact from "../../models/contacts";
import { TRequestAddUser } from "../../helpers/userTypesTS";
import parseToInteger from "../../helpers/parseToInteger";

const getById = async (req: TRequestAddUser, res: Response) => {
    // to check: Does user exist?
    const { user } = req;
    if (!user) {
        throw createError({
            status: 401
        })
    }
    // to define owner
    if (!user._id) {
        throw createError({
            status: 400
        })
    }

    //to check: Does contact's id exist
    const { contactId } = req.params;
    if (!contactId) {
        throw createError({
            status: 400
        })
    }

    //to find contact with _id=contactId
    //whoes owner is 'user'
    const result = await Contact.model.findOne({
        _id: contactId,
        owner: user._id,
    });
    if (!result) {
        throw createError({
            status: 404
        });
    }

    res.status(200).json(result)
}

export default getById;