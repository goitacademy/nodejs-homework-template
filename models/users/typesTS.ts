export type TUserSubscription = 'starter' | 'pro' | 'business';

export type TUser = {
    password: string,
    email: string,
    subscription?: TUserSubscription,
    token?: string | null
}
