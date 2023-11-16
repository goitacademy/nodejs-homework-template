const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true, 
    }
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);



// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const userSchema = new Schema({
//   password: {
//     type: String,
//     required: [true, 'Set password for user'],
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//   },
//   subscription: {
//     type: String,
//     enum: ["starter", "pro", "business"],
//     default: "starter"
//   },
//   owner: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//   },
//   token: String
// }, {
//   versionKey: false,
//   timestamps: true,
// });

// module.exports = mongoose.model("User", userSchema);
