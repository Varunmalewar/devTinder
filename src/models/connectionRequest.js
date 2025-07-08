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

// ConnectionRequest.find({fromUserId : 3214234324324324 , toUserId : 24234324}) // This will create an index on the fromUserId field
connectionRequestSchema.index({
    formUserId : 1,
    toUserId : 1
})

connectionRequestSchema.pre ('save',function(next){   // Middleware to run before saving a connection request
    const connectionRequest = this;               // It is type of middleware 
    // You can add any pre-save logic here if needed
    // Check if the from userId and toUserId are the same
    if( connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("You cannot send a connection request to yourself");
    }
    next();
})




// Creating Model for connection request
const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports = ConnectionRequestModel;