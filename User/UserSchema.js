
// for  users  info
const mongoose = require("mongoose")
const UserSchemaMethod = require("./UserSchemaMethod")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    phone: {
        type: Number,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,

    },
    firebaseUid: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["user", "admin",],
        default: "user",
    },
}, {
    timestamps: true
})
UserSchemaMethod(UserSchema)
module.exports = mongoose.model('user', UserSchema)
