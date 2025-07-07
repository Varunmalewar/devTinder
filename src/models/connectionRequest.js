const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({

    // sender: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    // receiver: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    // status: {
    //     type: String,
    //     enum: ['pending', 'accepted', 'rejected'],
    //     default: 'pending'
    // },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // }


    fromUserId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true, // Ensure that the sender's ID is provided
    },
    toUserId :{
        type: mongoose.Schema.Types.ObjectId,
        required: true, // Ensure that the receiver's ID is provided
    },
    status:{
        type:String,
        required: true, // Ensure that the status is provided
        default: 'ignored', // Default status is 'ignore'
        enum : {
            values :['ignored','intrested', 'accepted', 'rejected'],
            message: `{VALUE} is not a valid status type`
        }},  // you create enum to restrict the user for values of status
       





},{
    timestamps: true // Automatically adds createdAt and updatedAt fields

});

// Creating Model for connection request
const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports = ConnectionRequestModel;