import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ['starter', 'pro', 'business'],
        default: 'starter',
    },
    token: {
        type: String,
        default: null,
    },
});
userSchema.pre('save', async function () {
    if (this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

const User = mongoose.model('User', userSchema);

export default User;
