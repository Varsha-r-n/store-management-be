const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RoleSchema = new Schema({
    role_name: {
        type: String,
        required: [true, "Firstname is required"]
    }, 
    createdDate: {
        type: Date,
        required: [true, "created date is required"],
        default: Date.now
    },
    updatedDate: {
        type: Date,
        required: [false, "updated date is required"]
    },
    deletedDate: {
        type: Date,
        required: [false, "deleted date is required"]
    },

})

const UserModel = mongoose.model("roles", RoleSchema)
module.exports = UserModel