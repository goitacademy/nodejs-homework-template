import mongoose from 'mongoose';

export type ContactType = {
  name: string;
  email: string;
  phone: string;
  favorite: boolean;
  owner?: mongoose.Types.ObjectId;
};
