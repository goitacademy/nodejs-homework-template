import { Response } from "express";
import createError from "../../helpers/createError";
import { TRequestAddUser } from "../../helpers/userTypesTS";
import User from "../../models/users";
import { userSubscription } from "../../models/users/userSubscription";


const updateSubscription = async (req: TRequestAddUser, res: Response) => {
    const { user, body: { subscription } } = req;
    if (!user) {
        throw createError({ status: 401 })
    }

    const { error } = User.outerSchema.validateSubscription({ subscription });
    if (error) {
        throw createError({ status: 400, messageProd: error.message });
    }
    const idx = userSubscription.findIndex(item => item === subscription);
    if (idx === -1) {
        createError({ status: 400 });
    }
    const { _id } = user;

    const result = await User.model.findByIdAndUpdate(_id, { subscription }, { new: true });
    if (!result) {
        throw createError({ status: 404 });
    }
    console.log(result);

    res.json({
        status: "success",
        user: {
            email: result.email,
            subscription: result.subscription
        },
    })
}
export default updateSubscription;