const express = require('express');
// const User = require("../models/user")
const {userauth} = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require('../models/user');

const requestRouter = express.Router();


requestRouter.post("/request/send/:status/:toUserId", userauth, async (req,res)=>{

    try{
       const fromUserId = req.user._id; // Logging person userId
       const toUserId = req.params.toUserId; // UserId of the person to whom the request is sent

       const status = req.params.status; // Status of the connection request, can be 'ignored' or 'intrested'

       const allowedStatus= ['ignored','intrested']
       if(!allowedStatus.includes(status)){
        return res.status(400).json({message: "Invalid status type " +status})

       }

         // Check if the user is trying to send a request to themselves
         if(fromUserId.toString() === toUserId.toString()){
            return res.status(400).json({message: "You cannot send a connection request to yourself"});
         }

            // Check if the user is trying to send a request to an already connected user
            const connectedUsers = await ConnectionRequest.find({fromUserId: fromUserId, toUserId: toUserId, status: 'accepted'});
            if(connectedUsers.length > 0){
                return res.status(400).json({message: "You are already connected with this user"});
            }

            // Check if the user is trying to send a request to an already ignored user
            const ignoredUsers = await ConnectionRequest.find({fromUserId: fromUserId, toUserId: toUserId, status: 'ignored'});
            if(ignoredUsers.length > 0){
                return res.status(400).json({message: "You have already ignored this user"});
            }

            // Check if the user is trying to send a request to an already interested user
            const interestedUsers = await ConnectionRequest.find({fromUserId: fromUserId, toUserId: toUserId, status: 'intrested'});
            if(interestedUsers.length > 0){
                return res.status(400).json({message: "You have already sent an interested request to this user"});
            }

            // Check if the user is trying to send a request to an already rejected user
            const rejectedUsers = await ConnectionRequest.find({fromUserId: fromUserId, toUserId: toUserId, status: 'rejected'});
            if(rejectedUsers.length > 0){
                return res.status(400).json({message: "You have already rejected this user"});
            }

            // Check if the toUserId is already exist or not 
            const toUser = await User.findById(toUserId)
            if(!toUser){
                return res.status(404).json({message: "User not found"});
            }
            

            

       // If there is an existing connectionRequest
         const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId, status: 'intrested' },
                { fromUserId: toUserId, toUserId: fromUserId, status: 'intrested' }
            ],
        
         });
         if(existingConnectionRequest){
              return res.status(400).json({message: "Connection request already exists"});
            }

        

       const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status
       })
       const data = await connectionRequest.save();

    res.json({
        message: req.user.firstName + " sent the connection request",
        data: data
       })

    } 
    catch(err){
        res.status(404).send("ERROR"+ err.message);
    }

})
















module.exports = requestRouter;