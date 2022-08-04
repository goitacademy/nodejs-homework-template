import { Schema } from "mongoose";
export type TUserSubscription = 'starter' | 'pro' | 'business';

export type TUser = {
    _id: typeof Schema.Types.ObjectId,
    password: string,
    email: string,
    subscription?: TUserSubscription,
    token?: string | null
}
