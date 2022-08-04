import { Schema } from 'mongoose';

type TObjectId = typeof Schema.Types.ObjectId;

export type TContactAdd = {
    name: string,
    email?: string,
    favorite?: string,
    phone?: string,
    owner?: TObjectId,
}
