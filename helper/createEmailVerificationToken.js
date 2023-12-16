import { v4 as uuidv4 } from 'uuid';

export const createEmailVerificationToken = async () => await uuidv4();
