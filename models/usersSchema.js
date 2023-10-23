const {Schema, model} = require("mongoose");

const usersSchema = new Schema(
    {
        password: {
          type: String,
          required: [true, 'Set password for user'],
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
        token: String
      },
      {
        versionKey: false,
        timestamps: true,
      }
);

// usersSchema.post('validate', (err, next) => {
//   err.status = 400;
//   next(err);
// })

// usersSchema.post('save', (err, next) => {
//   err.status = 400;
//   next(err);
// })

const User = model('users', usersSchema);

module.exports = User;