import { Request, Response } from "express";
import createError from "../../helpers/createError";
import Contact from "../../models/contacts";
import { TRequestAddUser } from "../../helpers/userTypesTS";
import parseToInteger from "../../helpers/parseToInteger";

const getAll = async (req: TRequestAddUser, res: Response) => {

    //to check: Does user property is
    if (!req.user) {
        throw createError({
            status: 401,
        })
    }

    // to get contacts for 'owner' with user.id
    // properties: page and limit(per page)
    const { _id: owner } = req.user;

    console.log("req.user._id", owner);

    const { page: pageStr = "1",
        limit: limitStr = "20",
        favorite = false,
    } = req.query;

    const page = parseToInteger(pageStr);
    const limit = parseToInteger(limitStr);
    if (page === null || limit === null) {
        throw createError({ status: 400, messageProd: "Invalid query parameters" });
    }
    const skip = (page - 1) * limit;

    type TFilter = {
        owner: typeof owner,
        favorite?: boolean,
    }
    const filterSettings: TFilter = { owner }

    if (favorite) {
        filterSettings.favorite = true;
    }

    const result = await Contact.model.find(filterSettings, 'name email phone',
        { skip, limit });

    if (!result) {
        throw createError({
            status: 404,
        });
    }

    res.status(200).json(result);
}

export default getAll;