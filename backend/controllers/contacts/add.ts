import { Request, Response } from "express";
import createError from "../../helpers/createError";
import Contact from "../../models/contacts";
import { TRequestAddUser } from "../../helpers/userTypesTS";
const add = async (req: TRequestAddUser, res: Response) => {
    const { body, user } = req;
    if (!user) {
        throw createError({
            status: 401,
        })
    }
    if (!body) {
        throw createError({
            status: 404,
        })
    }

    const { error } = Contact.outerSchema.validateContactAdd(body);
    if (error) {
        throw createError({
            status: 400,
        });
    }

    const result = await Contact.model.create({ ...body, owner: user._id });
    res.status(201).json(result);
}

export default add;