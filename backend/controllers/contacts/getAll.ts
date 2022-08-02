import { Request, Response } from "express";
import createError from "../../helpers/createError";
import Contact from "../../models/contacts";

const getAll = async (req: Request, res: Response) => {
    const result = await Contact.model.find({}, 'name email phone');
    if (!result) {
        throw createError({
            status: 404,
        });
    }
    res.status(200).json(result);
}

export default getAll;