const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RatingSchema = new Schema({
    userId: {
        type: String,
        required: [true, "userId is required"]
    }, 
    storeId: {
        type: String,
        required: [true, "storeId is required"]
    }, 
    rating: {
        type: Number,
        required: [true, "rating is required"]
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

const UserModel = mongoose.model("ratings", RatingSchema)
module.exports = UserModel