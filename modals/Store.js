const mongoose = require('mongoose');
const Schema = mongoose.Schema

const StoreSchema = new Schema({
    name: {
        type: String,
        required: [true, "Firstname is required"]
    }, 
    email: {
        type: String,
        required: [true, "email is required"]
    },  
    address: {
        type: String,
        required: [true, "address is required"]
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
    }
})

const UserModel = mongoose.model("store", StoreSchema)
module.exports = UserModel