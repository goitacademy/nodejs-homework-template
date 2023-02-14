import mongoose, { ConnectOptions } from 'mongoose';

mongoose.set('strictQuery', true);

export const connectToDatabase = async (uri: string) =>
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);
