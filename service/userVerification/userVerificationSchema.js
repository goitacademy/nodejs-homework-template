const mongoose = require("mongoose");


const userVerificationSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
},
    { versionKey: false, timestamps: true},

)


const UserVerification = mongoose.model('Verification', userVerificationSchema);

module.exports = {
    UserVerification
};