const mongoose = require('mongoose')
const crypto = require('crypto')
const gravatar = require('gravatar');

const userSchema = new mongoose.Schema({
        password: {
            type: String,
            required: [true, 'Set password for user'],
            select: false,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
        },
        token: String,
        avatarURL: String,
    },
    {
        versionKey: false,
        timestamps: true,
    }

)


userSchema.pre('save', async function(next){
    if(this.isNew) {
        // const hashForGravatar = crypto.createHash('md5').update(this.email).digest('hex')
        // this.avatarURL = `https://www.gravatar.com/avatar/${hashForGravatar}.jpg`

        this.avatarURL = gravatar.url(this.email, {protocol: 'https',s: '250', d: 'retro'})
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User